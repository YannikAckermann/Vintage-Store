import { CreditCard } from "lucide-react"

export const TwintIcon = () => (
  <div className="relative w-12 h-8 flex items-center justify-center">
    <div className="absolute inset-0 bg-[#00a0df] rounded-md flex items-center justify-center text-white font-bold text-xs">
      TWINT
    </div>
  </div>
)

export const PostFinanceIcon = () => (
  <div className="relative w-12 h-8 flex items-center justify-center">
    <div className="absolute inset-0 bg-[#ffcc00] rounded-md flex items-center justify-center text-[#000000] font-bold text-xs">
      PF
    </div>
  </div>
)

export const GenericCardIcon = () => (
  <div className="relative w-12 h-8 flex items-center justify-center">
    <CreditCard className="h-6 w-6 text-gray-600" />
  </div>
)
