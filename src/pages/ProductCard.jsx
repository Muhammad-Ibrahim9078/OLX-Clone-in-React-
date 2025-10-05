import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../config/firebase";

export default function ProductCard() {
  const { id } = useParams(); // URL se id mil rahi hai
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchProduct() {
      setLoading(true);
      try {
        const ref = doc(db, "products", id);
        const snap = await getDoc(ref);
        if (!snap.exists()) {
          setError("Product nahi mila");
          setProduct(null);
        } else {
          setProduct({ id: snap.id, ...snap.data() });
        }
      } catch (err) {
        console.error(err);
        setError("Kuch ghalat hogaya");
      } finally {
        setLoading(false);
      }
    }
    fetchProduct();
  }, [id]);

  if (loading) return <div className="p-6">Loading product...</div>;
  if (error) return <div className="p-6 text-red-600">{error}</div>;
  if (!product) return null;

  return (
    <div className="max-w-5xl mx-auto p-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Left: Product Image */}
      <div className="lg:col-span-2">
        <img
          src={product.images?.[0] || "/placeholder.png"}
          alt={product.title}
          className="w-full h-96 object-cover rounded"
        />
        <h1 className="text-2xl font-bold mt-4">{product.title}</h1>
        <p className="text-gray-500 mt-1">{product.category}</p>
        <p className="mt-4 text-gray-700 whitespace-pre-line">{product.description}</p>
      </div>

      {/* Right: Price & Contact */}
      <aside className="bg-white p-4 rounded shadow">
        <div className="text-3xl font-bold">Rs {product.price}</div>
        <div className="mt-3 text-sm text-gray-500">
          Posted: {product.postedAt ? new Date(product.postedAt.seconds * 1000).toLocaleString() : "N/A"}
        </div>

        {/* Contact Buttons */}
        <div className="mt-6 space-y-3">
          <button
            onClick={() => navigate(`/chat/${product.sellerId}`, { state: { productId: product.id } })}
            className="w-full py-2 rounded bg-blue-600 text-white font-medium"
          >
            Message Seller
          </button>

          <a
            href={`tel:${product.sellerPhone || ""}`}
            className="block text-center w-full py-2 rounded border border-gray-300"
          >
            Call Seller
          </a>

          <button
            onClick={() =>
              navigator.share
                ? navigator.share({ title: product.title, text: product.description, url: window.location.href })
                : alert("Share feature not supported")
            }
            className="w-full py-2 rounded bg-gray-100"
          >
            Share
          </button>
        </div>

        <button onClick={() => navigate(-1)} className="mt-4 text-sm text-gray-500">
          Back
        </button>
      </aside>
    </div>
  );
}
