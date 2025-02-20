import { LoaiDichVuTable } from "@/features/loaidichvu/components/LoaiDichVuTable"
import { LoaiDichVuProvider } from "@/features/loaidichvu/contexts/LoaiDichVuContext"

const LoaiDichVuTableWrapper = () => (<LoaiDichVuProvider>
    <LoaiDichVuTable/>
</LoaiDichVuProvider>)
export default LoaiDichVuTableWrapper