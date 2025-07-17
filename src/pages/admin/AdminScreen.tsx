import { AdminLeftPanel } from "./LeftPanel";
import { AdminRightPanel } from "./RightPanel";

const AdminDashboard = () => {
  return (
    <div className="bg-background flex w-full h-svh lg:h-screen">
      <section className="bg-neutral-100 absolute z-10 lg:static flex w-[80%] lg:w-[20%] border border-neutral-300 -translate-x-[100%] lg:translate-x-0">
        <AdminLeftPanel/>
      </section>
      <section className="flex flex-col w-full lg:w-[80%]">
        <AdminRightPanel/>
      </section>
    </div>
  )
}
export default AdminDashboard;