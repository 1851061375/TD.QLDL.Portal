import { AntdTab, IAntdTabsProps } from '@/lib/antd/components'
import { DanhSachNguoiDung } from './DanhSachNguoiDung'
import { ZoomComponent } from '@/components/common'
import { ThongTin } from './ThongTin'
const TINBAI_TABS : IAntdTabsProps["items"] = [{
  label: "Người dùng",
  key:"nguoi-dung",
  children: <DanhSachNguoiDung/>
}, {
  label: "Phân quyền",
  key:"phan-quyen",
  children: <></>
}, {
  label: "Thông tin",
  key:"thong-tin",
  children: <ThongTin/>
}]

export const DanhSachTab = () => {
    return <ZoomComponent onRefresh={() => {}}>
      <AntdTab size='small' style={{ marginBottom: 32 }} type="card" items={TINBAI_TABS} />
    </ZoomComponent>
}