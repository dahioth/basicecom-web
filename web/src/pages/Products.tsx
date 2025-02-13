import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash, ShoppingCart } from 'lucide-react';
import { Product } from '../types';
import { addToCart } from '../store/slices/cartSlice';
import { useAppSelector, useAppDispatch as useDispatch } from '../store/hooks';
import { selectCurrentUser } from '../store/slices/authSlice';
import ProductModal from '../components/ProductModal';
import { useAddProductMutation, useDeleteProductMutation, useGetProductsQuery, useUpdateProductMutation } from '../store/slices/products/productApiSlice';

const Products: React.FC = () => {
  const dispatch = useDispatch();
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const { data, isLoading, error, refetch } = useGetProductsQuery();
  const [addProduct] = useAddProductMutation();
  const [updateProduct] = useUpdateProductMutation();
  const [deleteProduct] = useDeleteProductMutation();

  const currentUser = useAppSelector(selectCurrentUser)
  

  useEffect( () => {
    refetch();
  }, [refetch, data])

  const products = data;

  const handleAddProduct = async (productData: Omit<Product, 'id'>) => {
    console.log('Adding product:', productData);

    try {
      await addProduct({
        ...productData
      });
      setShowAddModal(false);
      await refetch();
    } catch(err) {
      console.log("Handle Add Product Error: ", err);
    }
  };

  const handleEditProduct = async (productData: Omit<Product, 'id'>) => {
    if (!selectedProduct) return;
    console.log('Editing product:', { id: selectedProduct.id, ...productData });

    try {
      await updateProduct({
        id: selectedProduct.id,
        product: productData
      })
      await refetch()
      setShowEditModal(false)
    } catch(err) {
      console.log("Handle edit product: ", err);
    }
  };

  const handleDeleteProduct = async (productId: number) => {
    console.log('Deleting product:', productId);
    try {
      await deleteProduct({
        id: productId
      })
      await refetch()
    } catch (err) {
      console.log(err)
    }
  };

  if (isLoading) return <p>Products are loading....</p>

  if (error) return <p>Error: {(error as any)?.message}</p>

  return (
    <div>
      
      { currentUser?.role == "ADMIN" && 
        <div className="flex justify-between items-center mb-6" >
        <h2 className="text-2xl font-bold text-gray-800">Products</h2>
        <button
          onClick={() => setShowAddModal(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-blue-700 transition-colors"
        >
          <Plus className="h-5 w-5" />
          <span>Add Product</span>
        </button>
      </div>}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products?.map((product) => (
          <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden">
            <img
              src="someurl"
              alt={product.name}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="text-lg font-semibold text-gray-800">{product.name}</h3>
              <p className="text-gray-600 mt-2">{product.description}</p>
              <div className="mt-4 flex items-center justify-between">
                <span className="text-xl font-bold text-gray-900">
                  ${product.price.toFixed(2)}
                </span>
                <div className="flex space-x-2">
                  <button
                    onClick={() => dispatch(addToCart(product))}
                    className="p-2 text-blue-600 hover:bg-blue-50 rounded-full"
                    title="Add to Cart"
                  >
                    <ShoppingCart className="h-5 w-5" />
                  </button>
                  {currentUser?.role == "ADMIN" &&
                  <>
                    <button
                      onClick={() => {
                        setSelectedProduct(product);
                        setShowEditModal(true);
                      }}
                      className="p-2 text-blue-600 hover:bg-blue-50 rounded-full"
                    >
                      <Edit className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() => handleDeleteProduct(product.id)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-full"
                    >
                      <Trash className="h-5 w-5" />
                    </button>
                  </>
                  }
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <ProductModal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        onSubmit={handleAddProduct}
      />

      <ProductModal
        isOpen={showEditModal}
        onClose={() => {
          setShowEditModal(false);
          setSelectedProduct(null);
        }}
        onSubmit={handleEditProduct}
        product={selectedProduct || undefined}
      />
    </div>
  );
}

export default Products;