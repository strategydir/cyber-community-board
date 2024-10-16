import { comparePassword } from "@/app/slices/adminSlice";
import { AppDispatch, RootState } from "@/app/stores/store";
import { Form, Input, Modal } from "antd";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

interface IAdminModal {
  IsModalOpen: boolean;
  handleOnOk: (match: boolean) => void;
  handleOnCancel: () => void;
}

const AdminModal = ({
  IsModalOpen,
  handleOnOk,
  handleOnCancel,
}: IAdminModal) => {
  const dispatch: AppDispatch = useDispatch();
  const admin = useSelector((state: RootState) => state.admin);

  const [adminPassword, setAdminPassword] = useState("");

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAdminPassword(event.target.value);
  };

  const handleOk = async () => {
    const resultAction = await dispatch(comparePassword(adminPassword));
    if (comparePassword.fulfilled.match(resultAction)) {
      handleOnOk(resultAction.payload || false);
    }
    setAdminPassword("");
  };

  const handleCancel = () => {
    setAdminPassword("");
    handleOnCancel();
  };

  return (
    <Modal
      title="กรอกรหัสเพื่อเข้าสู่โหมด admin"
      open={IsModalOpen}
      onOk={handleOk}
      confirmLoading={admin.loading}
      onCancel={handleCancel}
    >
      <Form autoComplete="off">
        <Form.Item style={{ display: "none" }}>
          <Input
            type="text"
            name="username"
            autoComplete="off"
            value="admin"
            readOnly
          />
        </Form.Item>
        <Form.Item>
          <Input.Password
            className="my-5"
            placeholder="กรอก admin password"
            value={adminPassword}
            onChange={handlePasswordChange}
            autoComplete="off"
            visibilityToggle={false}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AdminModal;
