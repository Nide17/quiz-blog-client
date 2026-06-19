import { useEffect, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getActiveAdverts } from "@/redux/slices/advertsSlice";
import adPlaceholder from "@/images/Einstein.jpg";
import ImageWithFallback from '@/utils/ImageWithFallback';

const Adverts = () => {
    const { activeAdverts = [] } = useSelector((state) => state.adverts || {});
    const [index, setIndex] = useState(0);
    const dispatch = useDispatch();

    // Fetch adverts once
    useEffect(() => {
        dispatch(getActiveAdverts());
    }, [dispatch]);

    // Rotate adverts
    const rotateAdvert = useCallback(() => {
        if (activeAdverts.length > 0) {
            setIndex((prev) => (prev + 1) % activeAdverts.length);
        }
    }, [activeAdverts.length]);

    useEffect(() => {
        if (activeAdverts.length === 0) return;
        const interval = setInterval(rotateAdvert, 10000);
        return () => clearInterval(interval);
    }, [rotateAdvert, activeAdverts.length]);

    // Active or fallback advert
    const advert =
        activeAdverts.length > 0
            ? activeAdverts[index]
            : {
                advert_image: adPlaceholder,
                caption:
                    "Welcome to Quiz-Blog! Take and review any multiple-choice quiz you want.",
                link: "#",
                fallback: true,
            };

    return (
        <div className="advert-container">
            <Link to={advert.link || "#"} target="_blank" className="advert-link">
                <ImageWithFallback
                    src={advert.advert_image || advert.fallback}
                    alt="Advert"
                    fallback={adPlaceholder}
                    className="advert-image"
                />
            </Link>

            <p className="advert-caption">
                {advert.caption}
            </p>
        </div>
    );
};

export default Adverts;
