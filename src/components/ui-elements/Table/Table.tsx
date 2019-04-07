import React, { Component } from "react";
import styles from "./Table.module.scss";

const Table = ({ table }: any) => {
  return (
    <table className={styles.table}>
      <thead>
        {table && (
          <tr>
            {Object.keys(table[0]).map((header, i) => {
              return (
                <td className={styles.header}>
                  <div className={styles.flex_row}>
                    <div>
                      {i === 2 ? (
                        <div className={styles.sort}>
                          <span>▲</span>
                          <span>▼</span>
                        </div>
                      ) : (
                        ""
                      )}
                    </div>
                    <div>{header}</div>
                  </div>
                </td>
              );
            })}
          </tr>
        )}
      </thead>
      <tbody>
        {table.map((item: any, i: any) => {
          return (
            <tr>
              {Object.keys(item).map((k, i) => {
                return <td>{item[k]}</td>;
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
export default Table;
