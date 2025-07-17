import { Logo } from "../../components/layout/Logo"

export const AdminLeftPanel =()=> {
  return (
    <div className="flex flex-col size-full flex-1 justify-between gap-10 overflow-hidden">
      <div className="w-full">
        <div className="w-full h-30 flex items-center px-8">
          <Logo/>
        </div>
        <div className="px-4 py-10">
          {/* Navigation */}
        </div>
      </div>
      <div className="w-full px-4 pt-6 pb-15 border-t border-neutral-300">
        {/* settings and logout */}
      </div>
    </div>
  )
}