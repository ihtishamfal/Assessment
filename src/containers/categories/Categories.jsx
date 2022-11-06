/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';

import Button from '@mui/material/Button';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { formats, modules } from '../../utils/Constants';
// Resuable components import
import H1 from '../../common/h1/H1Tag';
import P from '../../common/ptag/P';
import Label from '../../common/label/Label';
import InputField from '../../common/inputField/InputField';
import DataTable from '../datagrid/DataTableCategories';

function Categories({
  setState,
  formData,
  error,
  editError,
  setEditError,
  addCategory,
  vehicleCategories,
  getVehicleCategories,
}) {
  return (
    <div className="categories_section w-100">
      <div className="cs_form_container d-flex justify-center">
        <div className="d-flex flex-col w-50">
          <H1 className="header-tag" text="Categories" />
          <Label text="Category Name" htmlFor="ctname" />
          <InputField
            onChange={(e) => setState('categoryname', e.target.value)}
            value={formData?.categoryname}
            placeholder="Category name..."
          />
          {error.key === 'Category Name' ? <P className="error" text={error.message} /> : ''}
          <Label text="Category Description" htmlFor="ctdescription" />
          <div className="quil-container">
            <ReactQuill
              theme="snow"
              modules={modules}
              formats={formats}
              value={formData?.description}
              onChange={(value) => setState('description', value)}
            />
          </div>
          {error.key === 'Description' ? <P className="error" text={error.message} /> : ''}
          <div role="presentation" className="btn-container w-100 d-flex justify-center">
            <Button onClick={() => addCategory()} variant="contained">
              Add Category
            </Button>
          </div>
        </div>
      </div>
      <DataTable
        vehicleCategories={vehicleCategories}
        getVehicleCategories={getVehicleCategories}
        editError={editError}
        setEditError={setEditError}
      />
    </div>
  );
}

export default Categories;
