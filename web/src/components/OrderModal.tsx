import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { Order } from '../types';

interface OrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (status: Order['orderStatus']) => void;
  order: Order;
}

const OrderModal: React.FC<OrderModalProps> = ({ isOpen, onClose, onSubmit, order }) => {
  const [status, setStatus] = useState<Order['orderStatus']>(order.orderStatus);

  useEffect(() => {
    setStatus(order.orderStatus);
  }, [order]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(status);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 overflow-y-auto z-50">
      <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity" onClick={onClose}>
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>

        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium text-gray-900">
                Edit Order #{order.id}
              </h3>
              <button onClick={onClose} className="text-gray-400 hover:text-gray-500">
                <X className="h-6 w-6" />
              </button>
            </div>
            
            <form onSubmit={handleSubmit}>
              <div>
                <label className="block text-sm font-medium text-gray-700">Order Status</label>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value as Order['orderStatus'])}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                >
                  <option value="IN_PROGRESS">In Progress</option>
                  <option value="ORDERED">Ordered</option>
                  <option value="SHIPPED">Shipped</option>
                </select>
              </div>

              <div className="mt-5 sm:mt-6">
                <button
                  type="submit"
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:text-sm"
                >
                  Update Order
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderModal;