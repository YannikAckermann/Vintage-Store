import Link from "next/link"
import { Phone, AlertTriangle } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-green-50 border-t border-green-100">
      <div className="container mx-auto px-4 py-8">
        {/* Emergency Notice */}
        <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-8 flex items-start">
          <AlertTriangle className="text-red-600 h-6 w-6 mr-3 flex-shrink-0 mt-1" />
          <div>
            <h3 className="text-red-700 font-bold text-lg">In akuter Krise ruf bitte 112 an</h3>
            <p className="text-red-600 mt-1">
              Wenn du oder jemand in deiner Umgebung in unmittelbarer Gefahr ist, zögere nicht, den Notruf zu wählen.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <h3 className="text-green-800 font-bold text-lg mb-4">Besser.atmen</h3>
            <p className="text-gray-600">Wir bieten Unterstützung und Ressourcen für Menschen in psychischen Krisen.</p>
          </div>

          <div className="md:col-span-1">
            <h3 className="text-green-800 font-bold text-lg mb-4">Professionelle Hilfe</h3>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="text-gray-600 hover:text-green-700">
                  Therapeutensuche
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-600 hover:text-green-700">
                  Psychiatrischer Notdienst
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-600 hover:text-green-700">
                  Beratungsstellen
                </Link>
              </li>
            </ul>
          </div>

          <div className="md:col-span-1">
            <h3 className="text-green-800 font-bold text-lg mb-4">Rechtliches</h3>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="text-gray-600 hover:text-green-700">
                  Datenschutz
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-600 hover:text-green-700">
                  Impressum
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-600 hover:text-green-700">
                  Nutzungsbedingungen
                </Link>
              </li>
            </ul>
          </div>

          <div className="md:col-span-1">
            <h3 className="text-green-800 font-bold text-lg mb-4">Kontakt</h3>
            <p className="text-gray-600 flex items-center mb-2">
              <Phone className="h-4 w-4 mr-2 text-green-700" />
              Telefonseelsorge: 0800 111 0 111
            </p>
            <p className="text-gray-600">E-Mail: kontakt@besser-atmen.de</p>
          </div>
        </div>

        <div className="border-t border-green-200 mt-8 pt-6 text-center text-gray-500 text-sm">
          <p>© {new Date().getFullYear()} Besser.atmen - Alle Rechte vorbehalten</p>
          <p className="mt-2">Diese Website ersetzt keine professionelle medizinische oder psychologische Beratung.</p>
        </div>
      </div>
    </footer>
  )
}
