import * as Yup from 'yup';

export const addCategoryValidation = Yup.object().shape({
    categoryName: Yup.string()
        .min(2, 'Too Short!')
        .max(50, 'Too Long!')
        .required('Category Name is required'),
    categorySearchBy: Yup.string()
        .min(2, 'Too Short!')
        .max(50, 'Too Long!')
        .required('Category Search By is required'),
    categoryImage: Yup.mixed().required('Category Image is required'),
});

export const addProductValidation = Yup.object().shape({
    productName: Yup.string()
        .min(2, 'Too Short!')
        .max(50, 'Too Long!')
        .required('Product Name is required'),
    productBrand: Yup.string()
        .min(2, 'Too Short!')
        .max(50, 'Too Long!')
        .required('Product Brand is required'),
    productDescription: Yup.string()
        .min(10, 'Too Short!')
        .required('Product Description is required'),
    productImage: Yup.mixed().required('Product Image is required'),
    productCategory: Yup.array()
        .min(1, 'At least one product category must be selected')
        .required('Product Category is required'),
    amazonLink: Yup.string().url('Invalid URL format'),
    flipkartLink: Yup.string().url('Invalid URL format'),
    myntraLink: Yup.string().url('Invalid URL format'),
    ajioLink: Yup.string().url('Invalid URL format'),
})

export const editProductValidation = Yup.object().shape({
    productName: Yup.string()
        .min(2, 'Too Short!')
        .max(50, 'Too Long!')
        .required('Product Name is required'),
    productBrand: Yup.string()
        .min(2, 'Too Short!')
        .max(50, 'Too Long!')
        .required('Product Brand is required'),
    productDescription: Yup.string()
        .min(10, 'Too Short!')
        .required('Product Description is required'),
    productCategory: Yup.array()
        .min(1, 'At least one product category must be selected')
        .required('Product Category is required'),
    amazonLink: Yup.string().url('Invalid URL format'),
    flipkartLink: Yup.string().url('Invalid URL format'),
    myntraLink: Yup.string().url('Invalid URL format'),
    ajioLink: Yup.string().url('Invalid URL format'),
})