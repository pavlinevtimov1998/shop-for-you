import { useEffect } from "react";
import { useFetch } from "../../../Hooks/useFetch";
import { useParams } from "react-router-dom";

import styles from "./DetailsPage.module.css";

import { getOneProduct } from "../../../Services/productsService";

import { Carousel } from "../../components/Carousel/Carousel";
import { Spinner } from "../../components/Spinner/Spinner";
import { ProductDescription } from "../../components/ProductDescription/ProductDescription";
import { Map } from "../../components/Map/Map";
import { dateParser } from "../../../Utils/util";
import { DetailsMessage } from "../../components/DetailsMessage/DetailsMessage";
import { FormButton } from "../../components/FormButton/FormButton";
import { UserInfo } from "../../components/UserInfo/UserInfo";

export const DetailsPage = () => {
    const { productId } = useParams();
    const { isLoading, data } = useFetch(
        () => getOneProduct(productId),
        [productId]
    );

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    }, []);

    return (
        <>
            {isLoading ? (
                <Spinner />
            ) : (
                <main className={styles["content"]}>
                    <div className={styles["wrapper"]}>
                        <div className={styles["main-column"]}>
                            <Carousel images={data.product.images} />
                            <ProductDescription data={data.product} />
                            <DetailsMessage user={data.product._ownerId} />
                        </div>
                        <aside className={styles["aside"]}>
                            <article className={styles["info-container"]}>
                                <h3 className={styles["title"]}>Seller Info</h3>

                                <UserInfo user={data.product._ownerId} />

                                <FormButton
                                    className={styles["message-btn"]}
                                    type="button"
                                    content="Send Message"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 512 512"
                                        width={20}
                                        height={20}
                                    >
                                        <path d="M447.1 0h-384c-35.25 0-64 28.75-64 63.1v287.1c0 35.25 28.75 63.1 64 63.1h96v83.98c0 9.836 11.02 15.55 19.12 9.7l124.9-93.68h144c35.25 0 64-28.75 64-63.1V63.1C511.1 28.75 483.2 0 447.1 0zM464 352c0 8.75-7.25 16-16 16h-160l-80 60v-60H64c-8.75 0-16-7.25-16-16V64c0-8.75 7.25-16 16-16h384c8.75 0 16 7.25 16 16V352z" />
                                    </svg>
                                </FormButton>
                            </article>
                            <article className={styles["location"]}>
                                <div className={styles["map"]}>
                                    <Map
                                        location={data.product.location}
                                        GOOGLE_KEY={data.GOOGLE_KEY}
                                    />
                                </div>
                            </article>
                        </aside>
                    </div>
                </main>
            )}
        </>
    );
};
{
}
