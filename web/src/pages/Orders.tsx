import React, { useEffect, useState } from 'react';
import { Order } from '../types';
import OrderModal from '../components/OrderModal';
import { useGetOrdersQuery, useUpdateOrderStatusMutation } from '../store/slices/orders/orderApiSlice';
import { useAppSelector } from '../store/hooks';
import { selectCurrentUser } from '../store/slices/authSlice';

const Orders: React.FC = () => {
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const { data, isLoading, error, refetch} = useGetOrdersQuery();
  const [updateStatus] = useUpdateOrderStatusMutation()

  const orders = data;
  const currentUser = useAppSelector(selectCurrentUser)

  useEffect(() => {
    refetch()
  }, [refetch, data])

  const handleUpdateOrder = async (status: Order['orderStatus']) => {
    if (!selectedOrder) return;
    console.log('Updating order:', { id: selectedOrder.id, status });
    try {
      await updateStatus({
        id: selectedOrder.id,
        newStatus: {status}
      })
      await refetch();
    } catch (err) { 
      console.log(err);
    }
  };

  if (isLoading) return <p>Orders are loading.....</p>

  if (error) return <p>Error: {(error as any).message}</p>

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Orders</h2>
      
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Order ID
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                User ID
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Total
              </th>
              {currentUser?.role == "ADMIN" &&
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {orders?.map((order) => (
              <tr key={order.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {order.id}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {order.user.id}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    order.orderStatus === 'SHIPPED' ? 'bg-green-100 text-green-800' :
                    order.orderStatus === 'ORDERED' ? 'bg-red-100 text-yellow-800' :
                    'bg-yellow-100 text-red-800'
                  }`}>
                    {order.orderStatus}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  ${order.totalPrice.toFixed(2)}
                </td>
                {currentUser?.role == "ADMIN" && 
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <button
                    onClick={() => {
                      setSelectedOrder(order);
                      setShowEditModal(true);
                    }}
                    className="text-blue-600 hover:text-blue-900"
                  >
                    Edit
                  </button>
                </td>}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selectedOrder && (
        <OrderModal
          isOpen={showEditModal}
          onClose={() => {
            setShowEditModal(false);
            setSelectedOrder(null);
          }}
          onSubmit={handleUpdateOrder}
          order={selectedOrder}
        />
      )}
    </div>
  );
}

export default Orders;