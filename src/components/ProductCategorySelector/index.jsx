import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { status } from '../../constants/contants';
import { CircularProgress } from '@mui/material';
import { getAllProductCategories } from '../../store/features/productCategory/productCategoryActions';

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

export default function ProductCategorySelector({ value, initialChangeValue = false, formik, error, helperText }) {

    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true);
    const [productCategoryData, setProductCategoryData] = useState({});
    const [selectedValue, setSelectedValue] = useState([]);
    const [initialChange, setInitialChange] = useState(initialChangeValue);
    const productCategoryList = useSelector((state) => state.productCategory.getData);

    useEffect(() => {
        if (productCategoryList.currentStatus === status.IDLE) {
            dispatch(getAllProductCategories());
        }

        if (productCategoryList.currentStatus === status.SUCCEEDED) {
            setProductCategoryData(Object.entries(productCategoryList.data));
            setLoading(false);
        }

    }, [dispatch, productCategoryList.currentStatus])

    useEffect(() => {
        if (Object.entries(productCategoryData).length && Object.entries(value).length && initialChange) {

            const updatedDefaultValue = value.map((val) =>
                productCategoryData.find((subValue) => subValue[0] === val)
            );
            setSelectedValue(updatedDefaultValue);
            setInitialChange(false);

        }

    }, [productCategoryData, value])

    return (

        <Autocomplete
            multiple
            fullWidth
            value={selectedValue}
            loading={loading}
            onChange={(event, value) => {
                setSelectedValue(value);
                formik.setFieldValue('productCategory', value.map((value) => value[0]));
                formik.setFieldTouched('productCategory', true);
            }}
            onBlur={() => {
                formik.setFieldTouched('productCategory', true);
            }}
            id="productCategory"
            name="productCategory"
            options={loading ? [] : productCategoryData}
            getOptionLabel={(option) => option?.[1]?.categoryName}
            disableCloseOnSelect
            filterSelectedOptions
            renderOption={(props, option, { selected }) => (
                <li {...props}>
                    <Checkbox
                        icon={icon}
                        checkedIcon={checkedIcon}
                        style={{ marginRight: 8 }}
                        checked={selected}
                    />
                    {option?.[1]?.categoryName}
                </li>
            )}
            renderInput={(params) => (
                <TextField {...params} label="Product Category"
                name='productCategory'   
                error={error}
                    helperText={helperText}
                    InputProps={{
                        ...params.InputProps,
                        endAdornment: (
                            <>
                                {loading ? <CircularProgress color="inherit" size={20} /> : null}
                                {params.InputProps.endAdornment}
                            </>
                        ),
                    }} />
            )}
        />
    );
}

