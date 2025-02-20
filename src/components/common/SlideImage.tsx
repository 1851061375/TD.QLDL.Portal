"use client";

import { useState } from "react";
import styles from "./SlideImage.module.scss";

export const SlideImage = ({ images }: { images: string[] }) => {
    const [selectedIndex, setSelectedIndex] = useState(0);
    // const images = [
    //     "https://csdlvhttdl.dienbien.gov.vn//sites/qldl/Shared%20Documents/HinhAnh/DoanhNghiep/2024-05-02-vyhliy/du-lich-dien-bien-co-gi_uAYUTghs3EyBDcB6_jpg.jpg",
    //     "https://generated.vusercontent.net/placeholder.svg",
    //     "https://generated.vusercontent.net/placeholder.svg",
    //     "https://generated.vusercontent.net/placeholder.svg",
    //     "https://generated.vusercontent.net/placeholder.svg",
    // ];

    const handleThumbnailClick = (index: number) => {
        setSelectedIndex(index);
    };

    const handlePrevious = () => {
        setSelectedIndex((prevIndex) =>
            prevIndex === 0 ? images.length - 1 : prevIndex - 1
        );
    };

    const handleNext = () => {
        setSelectedIndex((prevIndex) =>
            prevIndex === images.length - 1 ? 0 : prevIndex + 1
        );
    };

    return (
        <div className={styles.container}>
            <div className={styles.imageContainer}>
                <img
                    src={images[selectedIndex]}
                    alt="Product"
                    className={styles.image}
                    style={{ aspectRatio: "800/600" }}
                />
                <div className={styles.navButtons}>
                    <button
                        onClick={handlePrevious}
                        className={styles.navButton}
                    >
                        <ChevronLeftIcon />
                    </button>
                    <button
                        onClick={handleNext}
                        className={styles.navButton}
                    >
                        <ChevronRightIcon />
                    </button>
                </div>
            </div>
            <div className={styles.thumbnails}>
                {images.map((image, index) => (
                    <button
                        key={index}
                        onClick={() => handleThumbnailClick(index)}
                        className={`${styles.thumbnailButton} ${index === selectedIndex ? styles.selected : ""
                            }`}
                    >
                        <img
                            src={image}
                            alt={`Thumbnail ${index + 1}`}
                            className={styles.thumbnailImage}
                        />
                    </button>
                ))}
            </div>
        </div>
    );
}

function ChevronLeftIcon(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="m15 18-6-6 6-6" />
        </svg>
    );
}

function ChevronRightIcon(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="m9 18 6-6-6-6" />
        </svg>
    );
}
