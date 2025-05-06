import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaTrash, FaPen } from 'react-icons/fa';

const TableRow = ({ recipe, onEdit, onDelete }) => {
  const navigate = useNavigate();

  const handleRowClick = () => {
    // Navigate to the RecipeDetailPage with the recipe's ID
    navigate(`/recipe/${recipe._id}`);
  };

  return (
    <tr onClick={handleRowClick} style={{ cursor: 'pointer' }}>
      <td>{recipe.name}</td>
      <td>{recipe.time}</td>
      <td>{recipe.review}</td>
      <td>
        <button onClick={(e) => {
          e.stopPropagation(); // Prevent row click event from being triggered
          onDelete(recipe._id);
        }} title="Delete">
          <FaTrash />
        </button>
        <button onClick={(e) => {
          e.stopPropagation(); // Prevent row click event from being triggered
          onEdit(recipe._id);
        }} title="Edit">
          <FaPen />
        </button>
      </td>
    </tr>
  );
};

export default TableRow;
