import styles from "@/app/components/loadingPage.module.css";
export default function LoadingPage() {
  return (
    <div className="fixed top-0 left-0 lg:left-64 right-0 h-dvh grid place-content-center">
      <span className={styles.loader}></span>
    </div>
  );
}
