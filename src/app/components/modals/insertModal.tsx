import { AppDispatch, RootState } from "@/app/stores/store";
import { Divider, Form, Modal } from "antd";
import { useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import TextInputComponent from "../TextInputComponent";
import { addItem, editItem, fetchItems } from "@/app/slices/foldersSlice";

interface IInsertModal {
  IsModalOpen: boolean;
  handleOnOk: (match: boolean) => void;
  handleOnCancel: () => void;
}

const InsertModal = ({
  IsModalOpen,
  handleOnOk,
  handleOnCancel,
}: IInsertModal) => {
  const dispatch: AppDispatch = useDispatch();
  const folders = useSelector((state: RootState) => state.folders);
  const [form] = Form.useForm();

  const [title, setTitle] = useState("");
  const [link, setLink] = useState("");
  const [category, setCategory] = useState("");
  const [loading, setLoading] = useState(false);

  const filteredFoldersByCategory = useMemo(() => {
    const filtered = [];
    if (category) {
      for (const categoryItem of folders.data) {
        if (
          categoryItem.category &&
          categoryItem.category
            .toLowerCase()
            .includes(category.toLowerCase()) &&
          categoryItem.category != category
        ) {
          filtered.push(categoryItem.category);
        }
      }
    }
    return filtered;
  }, [category, folders]);

  const resetInput = () => {
    setCategory("");
    setTitle("");
    setLink("");
  };

  const handleCategoryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCategory(event.target.value);
  };

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const handleLinkChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLink(event.target.value);
  };

  const handleOk = async () => {
    try {
      let match = false;
      await form.validateFields();
      /* find that item that I need to add is in any category folder? 
        if it already has category method will be update existing category and add Item in data list
        if it doesn't has category it'll create new category
      */
      setLoading(true);
      const find = folders.data.find(
        (categoryItem) => categoryItem.category == category
      );
      if (find) {
        const updatedData = [...find.data, { title: title, link: link }];

        // Create a new object for `find` with the updated `data` array
        const updatedCategory = { ...find, data: updatedData };

        // find.data.push({ title: title, link: link });
        const resultAction = await dispatch(editItem(updatedCategory));
        if (editItem.fulfilled.match(resultAction)) {
          match = true;
          dispatch(fetchItems());
          resetInput();
        }
      } else {
        const resultAction = await dispatch(
          addItem({
            id: "",
            category: category,
            data: [{ title: title, link: link }],
          })
        );
        if (addItem.fulfilled.match(resultAction)) {
          match = true;
          dispatch(fetchItems());
          resetInput();
        }
      }
      handleOnOk(match);
    } catch (err) {
      console.log(err);
      handleOnOk(false);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    handleOnCancel();
    resetInput();
  };

  return (
    <Modal
      title="เพิ่มข้อมูล"
      open={IsModalOpen}
      onOk={handleOk}
      confirmLoading={loading}
      onCancel={handleCancel}
    >
      <Divider />
      <Form
        className="my-5"
        form={form}
        autoComplete="off"
        layout="vertical"
        validateTrigger="onSubmit"
      >
        <Form.Item
          label="หมวดหมู่เอกสาร"
          name="category"
          rules={[{ required: true, message: "กรุณากรอกหมวดหมู่เอกสาร" }]}
          valuePropName="value"
          trigger="onChange"
        >
          <TextInputComponent
            placeholder="ใส่หมวดหมู่เอกสาร"
            value={category}
            onChange={handleCategoryChange}
            filtered={filteredFoldersByCategory}
          />
        </Form.Item>
        <Form.Item
          label="ชื่อเอกสาร"
          name="title"
          rules={[{ required: true, message: "กรุณากรอกชื่อเอกสาร" }]}
          valuePropName="value"
          trigger="onChange"
        >
          <TextInputComponent
            placeholder="ใส่ชื่อเอกสาร"
            value={title}
            onChange={handleTitleChange}
            filtered={[]}
          />
        </Form.Item>
        <Form.Item
          label="ลิงค์เอกสาร"
          name="link"
          rules={[{ required: true, message: "กรุณากรอกลิงค์เอกสาร" }]}
          valuePropName="value"
          trigger="onChange"
        >
          <TextInputComponent
            placeholder="ใส่ลิงค์เอกสาร"
            value={link}
            onChange={handleLinkChange}
            filtered={[]}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default InsertModal;
