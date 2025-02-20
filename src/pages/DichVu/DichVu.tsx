import { DichVuTable } from "@/features/dichvu/components/DichVuTable"
import { DichVuProvider } from "@/features/dichvu/contexts/DichVuContext"

const DichVuTableWrapper = () => (<DichVuProvider>
    <DichVuTable/>
</DichVuProvider>)
export default DichVuTableWrapper