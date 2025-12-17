import { useState, useRef, useEffect } from "react";
import { FaShoppingCart } from "react-icons/fa";
import ProductViewModal from "./ProductViewModal";
import { summarizeProduct } from "../../api/api";
import truncateText from "../../utils/truncateText";
import { useDispatch } from "react-redux";
import { addToCart } from "../../store/actions";
import toast from "react-hot-toast";

const ProductCard = ({
        productId,
        productName,
        image,
        description,
        quantity,
        price,
        discount,
        specialPrice,
        about = false,
}) => {
    const [openProductViewModal, setOpenProductViewModal] = useState(false);
    const btnLoader = false;
    const [selectedViewProduct, setSelectedViewProduct] = useState(null);
    const isAvailable = quantity && Number(quantity) > 0;
    const dispatch = useDispatch();

    const handleProductView = (product) => {
        if (!about) {
            console.log('open product modal', product);
            setSelectedViewProduct(product);
            setOpenProductViewModal(true);
        }
    };

    const addToCartHandler = (cartItems) => {
        dispatch(addToCart(cartItems, 1, toast));
    };

    const [aiSummary, setAiSummary] = useState(null);
    const [aiLoading, setAiLoading] = useState(false);
    const [aiError, setAiError] = useState(null);
    const [aiJustLoaded, setAiJustLoaded] = useState(false);
    const summaryRef = useRef(null);

    const fetchAiSummary = async (product) => {
        if (aiSummary) return; // simple cache per card
        setAiError(null);
        setAiLoading(true);
        try {
            const res = await summarizeProduct(product);
            const text = res?.summary || "No summary available";
            setAiSummary(text);
            // mark as newly loaded to highlight UI
            setAiJustLoaded(true);
        } catch (err) {
            setAiError('AI summary failed');
        } finally {
            setAiLoading(false);
        }
    };

    useEffect(() => {
        if (aiJustLoaded && summaryRef.current) {
            // scroll summary into view and clear highlight after 2s
            try { summaryRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' }); } catch(e){}
            const t = setTimeout(() => setAiJustLoaded(false), 2000);
            return () => clearTimeout(t);
        }
    }, [aiJustLoaded]);

    return (
        <div className="border rounded-lg shadow-xl overflow-hidden transition-shadow duration-300">
            <div onClick={() => {
                handleProductView({
                    id: productId,
                    productName,
                    image,
                    description,
                    quantity,
                    price,
                    discount,
                    specialPrice,
                })
            }} 
                    className="w-full overflow-hidden aspect-3/2">
                <img 
                className="w-full h-full cursor-pointer transition-transform duration-300 transform hover:scale-105"
                src={image}
                alt={productName}>
                </img>
            </div>
            <div className="p-4">
                <h2 onClick={() => {
                handleProductView({
                    id: productId,
                    productName,
                    image,
                    description,
                    quantity,
                    price,
                    discount,
                    specialPrice,
                })
            }}
                    className="text-lg font-semibold mb-2 cursor-pointer">
                    {truncateText(productName, 50)}
                </h2>
                
                <div className="min-h-[72px]">
                    <p className="text-gray-600 text-sm" style={{display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden'}}>
                        {truncateText(description, 120)}
                    </p>

                    {aiError && (
                        <p className="text-sm text-rose-600 mt-2">{aiError}</p>
                    )}

                    {aiSummary && (
                        <div
                            ref={summaryRef}
                            className={`mt-3 p-4 rounded-lg text-sm text-slate-900 bg-gradient-to-r from-sky-50 to-white border transition-all duration-300 ${aiJustLoaded ? 'ring-2 ring-sky-300 shadow-lg' : 'border-gray-100'}`}
                            aria-live="polite"
                        >
                            <div className="flex items-start gap-3">
                                <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-sky-600 text-white text-[11px] font-semibold select-none">AI</span>
                                <div className="flex-1">
                                    <div className="text-sm text-slate-900 text-center leading-6">{aiSummary}</div>
                                </div>
                            </div>
                        </div>
                    )}

                    {aiLoading && (
                        <p className="text-sm text-gray-500 mt-2">Generating summary...</p>
                    )}
                </div>

            { !about && (
                <div className="mt-4 flex items-center justify-between gap-4">
                    <div>
                        {specialPrice ? (
                            <div className="flex flex-col">
                                <span className="text-gray-400 line-through text-sm">
                                    ${Number(price).toFixed(2)}
                                </span>
                                <span className="text-lg font-bold text-slate-700">
                                    ${Number(specialPrice).toFixed(2)}
                                </span>
                            </div>
                        ) : (
                            <span className="text-lg font-bold text-slate-700">
                                ${Number(price).toFixed(2)}
                            </span>
                        )}
                    </div>

                    <div className="flex items-center gap-2">
                        <button
                            disabled={!isAvailable || btnLoader}
                            onClick={() => addToCartHandler({
                                image,
                                productName,
                                description,
                                specialPrice,
                                price,
                                productId,
                                quantity,
                            })}
                            className={`px-3 py-2 rounded-md text-sm flex items-center gap-2 transition ${isAvailable ? 'bg-blue-600 text-white hover:bg-blue-700' : 'bg-gray-200 text-gray-500 cursor-not-allowed'}`}>
                            <FaShoppingCart />
                            <span>{isAvailable ? 'Add' : 'Out'}</span>
                        </button>

                        <button
                            onClick={() => fetchAiSummary({
                                productName,
                                description,
                                productId,
                                image
                            })}
                            className="px-3 py-2 rounded-md text-sm border border-sky-600 text-sky-600 bg-white hover:bg-sky-50"
                        >
                            {aiLoading ? '…' : 'Summarize'}
                        </button>
                    </div>
                </div>
            )}
                
            </div>
            <ProductViewModal 
                open={openProductViewModal}
                setOpen={setOpenProductViewModal}
                product={selectedViewProduct}
                isAvailable={isAvailable}
            />
        </div>
    )
}

export default ProductCard;