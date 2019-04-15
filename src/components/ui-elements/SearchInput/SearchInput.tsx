import * as React from "react";

// ui-elements
import { TextInput } from "../Input/Input";
import { Button } from "../Button/Button";
import { Icon } from "../Icon";

// icons
import searchIcon from "../../../images/search.svg";

// styles
import styles from "./SearchInput.module.scss";

export default interface Iprops { }

export const SearchInput = ({ }: Iprops) => {
	return (
		<div className={styles.searchInput}>
		<TextInput placeholder="Placeholder" style={{ display: 'inline-block' }} />
		<Button>
			<Icon src={searchIcon} />
		</Button>
		</div>
	);
};
