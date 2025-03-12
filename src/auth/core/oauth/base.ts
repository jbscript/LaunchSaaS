import { env } from "@/data/env/server"
import { Cookies } from "../session"
import { z } from "zod"
import crypto from "crypto"
import { OAuthProvider } from "@/drizzle/schema"
import { createDiscordOAuthClient } from "./discord"
import { createGithubOAuthClient } from "./github"

const STATE_COOKIE_KEY = "oAuthState"
const CODE_VERIFIER_COOKIE_KEY = "oAuthCodeVerifier"
// Ten minutes in seconds
const COOKIE_EXPIRATION_SECONDS = 60 * 10

export class OAuthClient<T> {
  private readonly provider: OAuthProvider
  private readonly clientId: string
  private readonly clientSecret: string
  private readonly scopes: string[]
  private readonly urls: {
    auth: string
    token: string
    user: string
  }
  private readonly userInfo: {
    schema: z.ZodSchema<T>
    parser: (data: T) => { id: string; email: string; name: string }
  }
  private readonly tokenSchema = z.object({
    access_token: z.string(),
    token_type: z.string(),
  })

  constructor({
    provider,
    clientId,
    clientSecret,
    scopes,
    urls,
    userInfo,
  }: {
    provider: OAuthProvider
    clientId: string
    clientSecret: string
    scopes: string[]
    urls: {
      auth: string
      token: string
      user: string
    }
    userInfo: {
      schema: z.ZodSchema<T>
      parser: (data: T) => { id: string; email: string; name: string }
    }
  }) {
    this.provider = provider
    this.clientId = clientId
    this.clientSecret = clientSecret
    this.scopes = scopes
    this.urls = urls
    this.userInfo = userInfo
  }

  private get redirectUrl() {
    return new URL(this.provider, env.OAUTH_REDIRECT_URL_BASE)
  }

  createAuthUrl(cookies: Pick<Cookies, "set">) {
    const state = createState(cookies)
    const codeVerifier = createCodeVerifier(cookies)
    const url = new URL(this.urls.auth)
    url.searchParams.set("client_id", this.clientId)
    url.searchParams.set("redirect_uri", this.redirectUrl.toString())
    url.searchParams.set("response_type", "code")
    url.searchParams.set("scope", this.scopes.join(" "))
    url.searchParams.set("state", state)
    url.searchParams.set("code_challenge_method", "S256")
    url.searchParams.set(
      "code_challenge",
      crypto.hash("sha256", codeVerifier, "base64url")
    )
    return url.toString()
  }

  async fetchUser(code: string, state: string, cookies: Pick<Cookies, "get">) {
    const isValidState = await validateState(state, cookies)
    if (!isValidState) throw new InvalidStateError()

    const { accessToken, tokenType } = await this.fetchToken(
      code,
      getCodeVerifier(cookies)
    )

    const user = await fetch(this.urls.user, {
      headers: {
        Authorization: `${tokenType} ${accessToken}`,
      },
    })
      .then(res => res.json())
      .then(rawData => {
        const { data, success, error } = this.userInfo.schema.safeParse(rawData)
        if (!success) throw new InvalidUserError(error)

        return data
      })

    return this.userInfo.parser(user)
  }

  private fetchToken(code: string, codeVerifier: string) {
    return fetch(this.urls.token, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Accept: "application/json",
      },
      body: new URLSearchParams({
        code,
        redirect_uri: this.redirectUrl.toString(),
        grant_type: "authorization_code",
        client_id: this.clientId,
        client_secret: this.clientSecret,
        code_verifier: codeVerifier,
      }),
    })
      .then(res => res.json())
      .then(rawData => {
        const { data, success, error } = this.tokenSchema.safeParse(rawData)
        if (!success) throw new InvalidTokenError(error)

        return {
          accessToken: data.access_token,
          tokenType: data.token_type,
        }
      })
  }
}

export function getOAuthClient(provider: OAuthProvider) {
  switch (provider) {
    case "discord":
      return createDiscordOAuthClient()
    case "github":
      return createGithubOAuthClient()
    default:
      throw new Error(`Invalid provider: ${provider satisfies never}`)
  }
}

class InvalidTokenError extends Error {
  constructor(zodError: z.ZodError) {
    super("Invalid Token")
    this.cause = zodError
  }
}

class InvalidUserError extends Error {
  constructor(zodError: z.ZodError) {
    super("Invalid User")
    this.cause = zodError
  }
}

class InvalidStateError extends Error {
  constructor() {
    super("Invalid State")
  }
}

class InvalidCodeVerifierError extends Error {
  constructor() {
    super("Invalid Code Verifier")
  }
}

function createState(cookies: Pick<Cookies, "set">) {
  const state = crypto.randomBytes(64).toString("hex").normalize()
  cookies.set(STATE_COOKIE_KEY, state, {
    secure: true,
    httpOnly: true,
    sameSite: "lax",
    expires: Date.now() + COOKIE_EXPIRATION_SECONDS * 1000,
  })
  return state
}

function createCodeVerifier(cookies: Pick<Cookies, "set">) {
  const codeVerifier = crypto.randomBytes(64).toString("hex").normalize()
  cookies.set(CODE_VERIFIER_COOKIE_KEY, codeVerifier, {
    secure: true,
    httpOnly: true,
    sameSite: "lax",
    expires: Date.now() + COOKIE_EXPIRATION_SECONDS * 1000,
  })
  return codeVerifier
}

function validateState(state: string, cookies: Pick<Cookies, "get">) {
  const cookieState = cookies.get(STATE_COOKIE_KEY)?.value
  return cookieState === state
}

function getCodeVerifier(cookies: Pick<Cookies, "get">) {
  const codeVerifier = cookies.get(CODE_VERIFIER_COOKIE_KEY)?.value
  if (codeVerifier == null) throw new InvalidCodeVerifierError()
  return codeVerifier
}
