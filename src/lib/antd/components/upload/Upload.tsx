import { Button, message, Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import type { FormInstance } from 'antd';
import type { RcFile, UploadProps } from 'antd/es/upload/interface';
import { useCallback, useEffect } from 'react';
import axiosInstance, { getToken } from '@/lib/axios';
import { IResult } from '@/models';
import { API_VERSION, HOST_PATH } from '@/data';

const getBase64 = (img: RcFile, callback: (url: string) => void) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result as string));
    reader.readAsDataURL(img);
};


export interface IUploadAntdProps<IModel> extends UploadProps {
    formInstance: FormInstance<IModel>, fieldName: string, folderName: string, maxFileSize?: number
}

const AntdUpLoad = <IModel,>(props: IUploadAntdProps<IModel>) => {
    const { formInstance, fieldName, folderName, maxFileSize, listType, ...rest } = props
    const onChange: UploadProps["onChange"] = (info) => {
        console.log(info);
        if (info.file.status !== 'uploading') {
            console.log(info.file, info.fileList);
        }
        if (info.file.status === 'done') {
            getBase64(info.file.originFileObj as RcFile, (url) => {
                
                formInstance.setFieldValue(fieldName, info.file.response.data)
            });
            console.log(info.file.response.data);
            // message.success(`${info.file.name} file uploaded successfully`);
        } else if (info.file.status === 'error') {
            // message.error(`${info.file.name} file upload failed.`);
        }
    }
  

    const beforeUpload = useCallback((file: RcFile) => {
        // const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
        // if (!isJpgOrPng) {
        //     message.error('Vui lòng chọn định dạng ảnh JPG hoặc PNG!');
        // }
        const max = maxFileSize != undefined ? maxFileSize : 2
        const isLt2M = file.size / 1024 / 1024 < max;
        if (!isLt2M) {
            message.error('Kích thước ảnh nhỏ hơn 2MB!');
        }
        // return isJpgOrPng && isLt2M;
        return isLt2M;
    }, [])

    const onRemove: UploadProps["onRemove"] = async (file) => {
        const res = await axiosInstance.post<IResult<null>>(HOST_PATH + API_VERSION + 'files/removefile', {
            Path: file.response.data
        })
        if(res.status === 200){
            // toast.success("Xóa thành công")
            formInstance.setFieldValue(fieldName, undefined)
        }
    }
    useEffect(() => {
        return () => {
            const fileData = formInstance.getFieldValue(fieldName)
            if(fileData && fileData?.file){
                onRemove(fileData.file)
            }
        }
    },[])

    const uploadButton = () => {
        const button = <Button icon={<UploadOutlined />}>Chọn tệp</Button>
        
        if(formInstance.getFieldValue(fieldName)){
            return (<>
                {listType !== 'text' ? <img src={formInstance.getFieldValue(fieldName)} alt="ảnh đại diện" style={{ width: '100%' }} /> : <></>}
            </>)
        } else {
            return (<>
                {/* {formInstance.getFieldValue(fieldName)?.fileList?.length == 0 || formInstance.getFieldValue(fieldName) ? button : null} */}
                {button}
            </>)
        }
    }
    return <Upload name='Files'
        // disabled={formInstance.getFieldValue(fieldName) != null}
        data={{ FolderName: folderName }}
        showUploadList={{showRemoveIcon:true}}
        beforeUpload={beforeUpload}
        maxCount={1} action={HOST_PATH + API_VERSION + 'files/uploadfile'}  headers={{
            Authorization: `Bearer ${getToken()}`
        }}
        listType={listType}
        {...rest}
        onChange={onChange}
        onRemove={onRemove}>
            {uploadButton()}
            {/* {formInstance.getFieldValue(fieldName)?.fileList?.length == 0 || formInstance.getFieldValue(fieldName) === undefined ? uploadButton : null} */}
            {/* {uploadButton} */}
            {/* {formInstance.getFieldValue(fieldName) ? <img src={formInstance.getFieldValue(fieldName)} alt="ảnh đại diện" style={{ width: '100%' }} /> : uploadButton} */}
    </Upload>

}
export { AntdUpLoad }