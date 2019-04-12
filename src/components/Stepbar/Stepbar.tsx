import * as React from "react";

// styles
import styles from "./Stepbar.module.scss";


export default interface Iprops {
	caption?: string;
}

export const Stepbar = ({ caption }: Iprops) => (
	<div className={styles.stepbar}>
		<ul className={styles.stepsWrapper}>
			<li className={`${styles.completed} ${styles.step}`}>
				<a className={styles.item}>
					<span className={styles.circle}></span>
					<span className={styles.caption}>انتخاب سیستم عامل</span>
				</a>
			</li>
			<li className={`${styles.completed} ${styles.step}`}>
				<a className={styles.item}>
					<span className={styles.circle}></span>
					<span className={styles.caption}>انتخاب مدت سرویس</span>
				</a>
			</li>
			<li className={`${styles.current} ${styles.step}`}>
				<a className={styles.item}>
					<span className={styles.circle}></span>
					<span className={styles.caption}>انتخاب طرح</span>
				</a>
			</li>
			<li className={`${styles.step}`}>
				<a className={styles.item}>
					<span className={styles.circle}></span>
					<span className={styles.caption}>اطلاعات کارت شبکه</span>
				</a>
			</li>
			<li className={`${styles.step}`}>
				<a className={styles.item}>
					<span className={styles.circle}></span>
					<span className={styles.caption}>انتخاب نام سرور و ثبت نهایی</span>
				</a>
			</li>
		</ul>
	</div>
);