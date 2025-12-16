import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Divider } from '@mui/material';
import Status from './Status';
import { MdClose, MdDone } from 'react-icons/md';

function ProductViewModal({ open, setOpen, product = {}, isAvailable }) {
  const { id, productName, image, description, quantity, price, discount, specialPrice } = product || {};

  useEffect(() => {
    if (!open) return;
    console.log('[ProductViewModal] useEffect mount - lock body scroll');
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      console.log('[ProductViewModal] useEffect cleanup - unlock body scroll');
      document.body.style.overflow = prev || '';
      console.log('[ProductViewModal] unmount');
    };
  }, [open]);

  if (!open) return null;

  console.log('[ProductViewModal] render', { open, product });

  const modal = (
    <div className="fixed inset-0 flex items-center justify-center" style={{ zIndex: 2147483647 }}>
      <div className="absolute inset-0 bg-black opacity-40" onClick={(e) => { console.log('[ProductViewModal] overlay clicked'); setOpen(false);} } />

      <div className="relative bg-white rounded-lg shadow-xl w-[92%] md:max-w-[620px]" style={{ zIndex: 2147483647 }}>
        {image && (
          <div className='flex justify-center aspect-3/2'>
            <img src={image} alt={productName} className="w-full h-full object-cover rounded-t-lg" />
          </div>
        )}

        <div className='px-6 pt-6 pb-2'>
          <div className="flex justify-between items-start">
            <h1 className="lg:text-3xl sm:text-2xl text-xl font-semibold leading-6 text-gray-800 mb-2">{productName}</h1>
            <button onClick={() => { console.log('[ProductViewModal] close button clicked'); setOpen(false);} } className="text-gray-600 hover:text-gray-800"><MdClose size={20} /></button>
          </div>

          <div className="space-y-2 text-gray-700 pb-4">
            <div className="flex items-center justify-between gap-2">
              {specialPrice ? (
                <div className="flex items-center gap-2">
                  <span className="text-gray-400 line-through">${Number(price).toFixed(2)}</span>
                  <span className="sm:text-xl font-semibold text-slate-700">${Number(specialPrice).toFixed(2)}</span>
                </div>
              ) : (
                <span className="text-xl font-bold">${Number(price).toFixed(2)}</span>
              )}

              {isAvailable ? (
                <Status text="In Stock" icon={MdDone} bg="bg-teal-200" color="text-teal-900" />
              ) : (
                <Status text="Out-Of-Stock" icon={MdClose} bg="bg-rose-200" color="text-rose-700" />
              )}
            </div>

            <Divider />

            <p>{description}</p>
          </div>
        </div>

        <div className="px-6 py-4 flex justify-end gap-4">
          <button
            onClick={() => setOpen(false)}
            type="button"
            className="px-4 py-2 text-sm font-semibold text-slate-700 border border-slate-700 hover:text-slate-800 hover:border-slate-800 rounded-md"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );

  return typeof document !== 'undefined' ? createPortal(modal, document.body) : modal;
}

export default ProductViewModal;