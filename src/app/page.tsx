import { Button } from "@/components/ui/button";
import { ArrowRight, Filter, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import NavbarLanding from "@/components/landing/navbar";

export default async function HomePage() {
  return (
    <div className="container mx-auto p-4">
      <NavbarLanding />
      <main className="container mx-auto px-4 py-16 md:py-24">
        {/* Notification Banner */}
        <div className="flex justify-center mb-12">
          <div className="bg-secondary-foreground backdrop-blur-sm rounded-full px-4 py-2 flex items-center gap-2 text-sm">
            <span className="text-gray-300">
              Introducing: Better Auth Integration
            </span>
            <a
              href="#"
              className="text-purple-400 hover:text-purple-300 flex items-center gap-1"
            >
              Read more <ArrowRight className="h-3 w-3" />
            </a>
          </div>
        </div>

        {/* Hero Content */}
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            Build intuitive apps that your customers will love
          </h1>
          <p className="text-xl text-gray-400 mb-8 leading-relaxed">
            Saas UI is a purpose-built toolkit for building high-quality apps.
            Start with our free component library and build fullstack apps with
            production-ready templates and starter kits.
          </p>

          {/* Technology Badges */}
          <div className="flex justify-center gap-6 mb-12">
            <div className="flex items-center gap-2 text-gray-300">
              <div className="w-6 h-6 bg-gray-800 rounded-full flex items-center justify-center">
                <span className="text-xs">⚛️</span>
              </div>
              <span>React</span>
            </div>
            <div className="flex items-center gap-2 text-gray-300">
              <div className="w-6 h-6 bg-teal-500 rounded-full flex items-center justify-center">
                <span className="text-xs">C</span>
              </div>
              <span>chakra</span>
            </div>
            <div className="flex items-center gap-2 text-gray-300">
              <div className="w-6 h-6 bg-gray-800 rounded-full flex items-center justify-center">
                <span className="text-xs">F</span>
              </div>
              <span>Figma</span>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button className="bg-purple-600 hover:bg-purple-700 text-white rounded-md px-6 py-5">
              View Demo
            </Button>
            <Button variant="outline" className="rounded-md px-6 py-5">
              Read documentation <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* App Screenshot */}
        <div className="relative max-w-5xl mx-auto">
          <div className="rounded-lg border border-gray-700 overflow-hidden shadow-2xl">
            <div className="bg-gray-900 p-4">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 bg-gray-800 rounded flex items-center justify-center">
                    <span className="text-xs font-bold">S</span>
                  </div>
                  <span className="text-sm font-medium">Saas UI</span>
                </div>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    className="w-64 pl-9 pr-4 py-1.5 bg-gray-800 border-gray-700 text-sm rounded-md"
                    placeholder="Search by name or email..."
                  />
                </div>
                <Button
                  size="sm"
                  className="bg-purple-600 hover:bg-purple-700 text-white text-xs"
                >
                  Add person
                </Button>
              </div>

              <div className="flex gap-2 mb-4">
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-xs text-gray-300"
                >
                  All
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-xs text-gray-300"
                >
                  Leads
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-xs text-gray-300"
                >
                  Customers
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="text-xs text-gray-300 ml-auto"
                >
                  <Filter className="h-3 w-3 mr-1" /> Filter
                </Button>
              </div>

              <div className="bg-gray-800 rounded-md p-4">
                <table className="w-full">
                  <thead>
                    <tr className="text-xs text-gray-400 border-b border-gray-700">
                      <th className="pb-2 text-left font-medium">Status</th>
                      <th className="pb-2 text-left font-medium">Name</th>
                      <th className="pb-2 text-left font-medium">Email</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="text-sm border-b border-gray-700">
                      <td className="py-3">
                        <span className="px-2 py-1 bg-green-900/30 text-green-400 rounded-full text-xs">
                          Active
                        </span>
                      </td>
                      <td className="py-3">Joshua Klein</td>
                      <td className="py-3 text-gray-400">
                        joshua.klein@example.com
                      </td>
                    </tr>
                    <tr className="text-sm border-b border-gray-700">
                      <td className="py-3">
                        <span className="px-2 py-1 bg-blue-900/30 text-blue-400 rounded-full text-xs">
                          Partner
                        </span>
                      </td>
                      <td className="py-3">Mohammed Rodriguez</td>
                      <td className="py-3 text-gray-400">
                        mohammed_rodriguez@example.org
                      </td>
                    </tr>
                    <tr className="text-sm">
                      <td className="py-3">
                        <span className="px-2 py-1 bg-purple-900/30 text-purple-400 rounded-full text-xs">
                          Lead
                        </span>
                      </td>
                      <td className="py-3">Markusz Johnson</td>
                      <td className="py-3 text-gray-400">
                        markusz.johnson@mac.dev
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
