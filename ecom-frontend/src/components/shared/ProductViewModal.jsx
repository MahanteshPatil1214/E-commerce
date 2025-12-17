import { Dialog } from '@headlessui/react'
import { Divider } from '@mui/material';
import { useState } from 'react'
import { summarizeProduct } from '../../api/api'
import Status from './Status';
import { MdClose, MdDone } from 'react-icons/md';

function ProductViewModal({open, setOpen, product = {}, isAvailable}) {
  
  const {id, productName, image, description, quantity, price, discount, specialPrice} = product || {};
  const [summary, setSummary] = useState(null);
  const [aiLoading, setAiLoading] = useState(false);
  const [aiError, setAiError] = useState(null);
  const [aiJustLoaded, setAiJustLoaded] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  }

  return (
    <>
      <Dialog open={open} as="div" className="relative z-10" onClose={() => setOpen(false)}>
      <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <div
              className="relative transform overflow-hidden rounded-lg bg-white shadow-xl transition-all md:max-w-[620px] md:min-w-[620px] w-full"
            >
                {image && (
                    <div className='flex justify-center aspect-3/2'>
                    <img 
                    src={image}
                    alt={productName} />
                    </div>
                )}



                <div className='px-6 pt-10 pb-2'>
                <h1 className="lg:text-3xl sm:text-2xl text-xl font-semibold leading-6 text-gray-800 mb-4">
                {productName}
              </h1>


              <div className="space-y-2 text-gray-700 pb-4">
                <div className="flex items-center justify-between gap-2">
                  {specialPrice ? (
                    <div className="flex items-center gap-2">
                      <span className="text-gray-400 line-through">
                        ${Number(price).toFixed(2)}
                      </span>
                      <span className="sm:text-xl font-semibold text-slate-700">
                        ${Number(specialPrice).toFixed(2)}
                      </span>
                    </div>
                  ) : (
                    <span className="text-xl font-bold">
                      {" "}
                      ${Number(price).toFixed(2)}
                    </span>
                  )}

                  {isAvailable ? (
                    <Status
                      text="In Stock"
                      icon={MdDone}
                      bg="bg-teal-200"
                      color="text-teal-900"
                    />
                  ) : (
                    <Status
                      text="Out-Of-Stock"
                      icon={MdClose}
                      bg="bg-rose-200"
                      color="text-rose-700"
                    />
                  )}
                </div>

                <Divider />

                <p>{description}</p>

                {summary && (
                  <div className={`mt-3 p-4 rounded-lg text-sm text-slate-900 bg-gradient-to-r from-sky-50 to-white border transition-all duration-300 ${aiJustLoaded ? 'ring-2 ring-sky-300 shadow-lg' : 'border-gray-100'}`} aria-live="polite">
                    <div className="flex items-start gap-3">
                        <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-sky-600 text-white text-[11px] font-semibold select-none">AI</span>
                        <div className="flex-1">
                            <div className="text-sm text-slate-900 text-center leading-6">{summary}</div>
                        </div>
                    </div>
                  </div>
                )}

                {aiError && (
                  <div className="mt-3 text-sm text-rose-600">{aiError}</div>
                )}
              </div>
                </div>


            <div className="px-6 py-4 flex justify-end gap-4">
              <button
                onClick={async () => {
                  setAiError(null);
                  setAiLoading(true);
                  try {
                    const res = await summarizeProduct(product);
                    const txt = res?.summary || '';
                    setSummary(txt);
                    // briefly highlight new summary
                    setAiJustLoaded(true);
                    setTimeout(() => setAiJustLoaded(false), 2000);
                  } catch (err) {
                    setAiError('Failed to generate summary');
                  } finally {
                    setAiLoading(false);
                  }
                }}
                type="button"
                className="px-4 py-2 text-sm font-semibold text-white bg-sky-600 hover:bg-sky-700 rounded-md"
                disabled={aiLoading}
              >
                {aiLoading ? 'Generating…' : 'Summarize'}
              </button>
              <button
                onClick={() => setOpen(false)}
                type="button"
                className="px-4 py-2 text-sm font-semibold text-slate-700 border border-slate-700 hover:text-slate-800 hover:border-slate-800 rounded-md "
              >
                Close
              </button>
            </div>
            </div>
          </div>
        </div>
      </Dialog>
    </>
  )
}

export default ProductViewModal;