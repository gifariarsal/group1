import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCategories } from "../../redux/reducer/CategoryReducer";
import { Button, Table, Tbody, Td, Th, Thead, Tr, Input, Text } from "@chakra-ui/react";
import axios from "axios";

const ListCategory = () => {
  const dispatch = useDispatch();
  const categoryList = useSelector((state) => state.CategoryReducer.category);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const res = await axios.get("http://localhost:8000/api/category");
      dispatch(setCategories(res.data.data));
    } catch (err) {
      console.log(err);
      alert(err);
    }
  };

  const delDeactiveCategory = async (id) => {
    try {
      const res = await axios.patch(`http://localhost:8000/api/category/deactivate?id=${id}`);
      alert(res.data.message);
      fetchCategories();
    } catch (err) {
      console.log(err);
      alert(err);
    }
  };

  const activateCategory = async (id) => {
    try {
      const res = await axios.patch(`http://localhost:8000/api/category/activate?id=${id}`);
      alert(res.data.message);
      fetchCategories();
    } catch (err) {
      console.log(err);
      alert(err);
    }
  };

  const [editingId, setEditingId] = useState(null);
  const [editedName, setEditedName] = useState("");

  const handleEdit = (id, name) => {
    setEditingId(id);
    setEditedName(name);
  };

  const handleSave = async () => {
    try {
      await axios.patch(`http://localhost:8000/api/category/?id=${editingId}`, {
        name: editedName,
      });
      setEditingId(null);
      fetchCategories();
      alert("Category updated successfully");
    } catch (err) {
      console.log(err);
      alert(err);
    }
  };

  return (
    <div>
        <Text align={"center"} fontSize={"2xl"} fontWeight={"bold"} mb={4}>Category List</Text>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>Name</Th>
            <Th>Status Category</Th>
            <Th>Edit</Th>
            <Th>Deactivate / Activate</Th>
          </Tr>
        </Thead>
        <Tbody>
          {categoryList.map((category) => (
            <Tr key={category.id}>
              <Td>
                {editingId === category.id ? (
                  <Input
                    value={editedName}
                    onChange={(e) => setEditedName(e.target.value)}
                    size="sm"
                  />
                ) : (
                  category.name
                )}
              </Td>
              <Td color={category.isActive ? "green" : "red"} fontWeight={"bold"}>{category.isActive ? "Active" : "Inactive"}</Td>
              <Td>
                {editingId === category.id ? (
                  <Button colorScheme="blue" size="sm" onClick={handleSave}>
                    Save
                  </Button>
                ) : (
                  <Button colorScheme="blue" size="sm" onClick={() => handleEdit(category.id, category.name)}>
                    Edit
                  </Button>
                )}
              </Td>
              <Td>
                {category.isActive ? (
                  <Button colorScheme="red" size="sm" onClick={() => delDeactiveCategory(category.id)}>
                    Deactivate
                  </Button>
                ) : (
                  <Button colorScheme="green" size="sm" onClick={() => activateCategory(category.id)}>
                    Activate
                  </Button>
                )}
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </div>
  );
};

export default ListCategory;
