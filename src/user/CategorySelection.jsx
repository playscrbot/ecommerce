import React from 'react';
import { usePreferences } from './PreferencesProvider';

const CategorySelection = ({ categories }) => {
  const { preferences, updatePreferences } = usePreferences();

  const handleCategorySelect = async (category) => {
    const newPreferences = {
      ...preferences,
      favoriteCategories: [...preferences.favoriteCategories, category]
    };
    await updatePreferences(currentUser.uid, newPreferences);
  };

  return (
    <div>
      <h2>Select Your Favorite Categories:</h2>
      <ul>
        {categories.map(category => (
          <li key={category} onClick={() => handleCategorySelect(category)}>
            {category}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CategorySelection;