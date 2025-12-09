import clsx from "clsx";
import Modal, { ModalProps } from "../Modal";
import classes from "./WalletTransferModal.module.css";

import CheckCircleIcon from "../../../../assets/icons/check-circle.svg?component-react";
import ClockIcon from "../../../../assets/icons/clock.svg?component-react";
import ErrorIcon from "../../../../assets/icons/error.svg?component-react";
import CancelledIcon from "../../../../assets/icons/x-circle.svg?component-react";
import { API } from "../../../presale-gg/api";
import React, { useMemo } from "react";
import { copyText, formatNumber, parseNum } from "../../../presale-gg/util";
import Spinner from "../Spinner";

export type WalletTransferModalProps = Omit<ModalProps, "title"> & {
  state: "sending" | "confirming" | "finalizing" | "finished" | "errored";
  transaction: API.PurchaseTransactionHistoryItemV2 | null;
  transactionHash: string | null;
  transactionError: string | null;
  payAmount: string;
  payCurrency: API.PaymentToken;
};

const WalletTransferModal: React.FC<WalletTransferModalProps> = ({
  state,
  transaction,
  transactionHash,
  transactionError,
  payAmount,
  payCurrency,
  ...others
}) => {
  const statusBoxes = useMemo<StatusBoxProps[]>(() => {
    const boxes: StatusBoxProps[] = [];

    let sendStatus: StatusBoxProps["status"];
    if (state === "sending") sendStatus = "in_progress";
    else if (state === "errored") sendStatus = "errored";
    else sendStatus = "completed";

    let sendTitle = "Transaction Sending";
    if (sendStatus === "completed") sendTitle = "Transaction Sent";
    else if (sendStatus === "errored") sendTitle = "Transaction Errored";

    boxes.push({
      status: sendStatus,
      title: sendTitle,
      body:
        sendStatus === "errored" ? transactionError ?? undefined : undefined,
    });

    let confirmStatus: StatusBoxProps["status"];
    if (state === "confirming") confirmStatus = "in_progress";
    else if (state === "errored") confirmStatus = "cancelled";
    else if (state === "sending") confirmStatus = "waiting";
    else confirmStatus = "completed";

    let confirmTitle: string;
    if (confirmStatus === "completed") confirmTitle = "Transaction Confirmed";
    else if (confirmStatus === "cancelled")
      confirmTitle = "Confirmation Cancelled";
    else if (confirmStatus === "in_progress")
      confirmTitle = "Confirming Transaction";
    else confirmTitle = "Awaiting Confirmation";

    boxes.push({ status: confirmStatus, title: confirmTitle });

    let completeStatus: StatusBoxProps["status"];
    if (state === "confirming") completeStatus = "waiting";
    else if (state === "errored") completeStatus = "cancelled";
    else if (state === "sending") completeStatus = "waiting";
    else if (state === "finalizing") completeStatus = "in_progress";
    else completeStatus = "completed";

    let completeTitle: string;
    if (completeStatus === "completed") completeTitle = "Transaction Complete";
    else if (completeStatus === "cancelled")
      completeTitle = "Transaction Cancelled";
    else if (completeStatus === "in_progress")
      completeTitle = "Finalizing Transaction";
    else completeTitle = "Awaiting Completion";

    const completeBody =
      completeStatus === "completed"
        ? `Received ${formatNumber(
            parseNum(transaction?.tokens_bought),
            2,
            4
          )} $DOGEBALL`
        : undefined;

    boxes.push({
      status: completeStatus,
      title: completeTitle,
      body: completeBody,
    });

    return boxes;
  }, [state, transaction, transactionHash]);

  return (
    <Modal {...others} title="Transaction">
      <div className={classes["label-container"]}>
        <Input
          value={state === "errored" ? "Error" : transactionHash ?? ""}
          label="Transaction Hash"
          loading={!transactionHash && state !== "errored"}
        />
      </div>
      <div className={classes["info-container"]}>
        <p className={classes["info-label"]}>Transaction Summary</p>
        <div className={classes["summary-container"]}>
          <div className={classes["summary-item"]}>
            <p className={classes["summary-label"]}>You Sent</p>
            <p className={classes["summary-value"]}>
              {formatNumber(parseNum(payAmount))}{" "}
              {payCurrency.symbol.toUpperCase()}
            </p>
          </div>
          <div className={classes["summary-item"]}>
            <p className={classes["summary-label"]}>You Received</p>
            <div className={classes["summary-value"]}>
              <ValueLoader
                loading={!transaction && state !== "errored"}
                loadingText="Calculating"
              >
                {state === "errored"
                  ? "Error"
                  : `${formatNumber(
                      parseNum(transaction?.tokens_bought),
                      2,
                      4
                    )} $DOGEBALL`}
              </ValueLoader>
            </div>
          </div>
          <div className={classes["summary-item"]}>
            <p className={classes["summary-label"]}>Rate</p>
            <div className={classes["summary-value"]}>
              <ValueLoader
                loading={!transaction && state !== "errored"}
                loadingText="Calculating"
              >
                {state === "errored"
                  ? "Error"
                  : `1 ${payCurrency.symbol.toUpperCase()} = ${formatNumber(
                      parseNum(transaction?.tokens_bought) /
                        parseNum(payAmount),
                      2,
                      4
                    )} $DOGEBALL`}
              </ValueLoader>
            </div>
          </div>
        </div>
      </div>

      <div
        className={clsx(classes["info-container"], classes["status-container"])}
      >
        {statusBoxes.map((box, idx) => (
          <StatusBox key={idx} {...box} />
        ))}
      </div>
    </Modal>
  );
};

export default WalletTransferModal;

const ValueLoader: React.FC<{
  loading: boolean;
  loadingText?: string;
  children?: React.ReactNode | React.ReactNode[];
}> = (props) => {
  return (
    <>
      {props.loading ? (
        <>
          {props.loadingText ?? "Loading"} <Spinner size={3} />
        </>
      ) : (
        <>{props.children}</>
      )}
    </>
  );
};

type StatusBoxProps = {
  title: string;
  status: "in_progress" | "completed" | "waiting" | "errored" | "cancelled";
  body?: string;
};

const StatusBox: React.FC<StatusBoxProps> = (props) => {
  return (
    <div
      className={clsx(
        classes["status-box"],
        classes[`status-${props.status.replace("_", "-")}`]
      )}
    >
      <div className={classes["status-icon-container"]}>
        {props.status === "in_progress" && <Spinner size={4} />}
        {props.status === "completed" && <CheckCircleIcon />}
        {props.status === "waiting" && <ClockIcon />}
        {props.status === "errored" && <ErrorIcon />}
        {props.status === "cancelled" && <CancelledIcon />}
      </div>
      <div className={classes["status-text-container"]}>
        <p className={classes["status-title"]}>{props.title}</p>
        <p className={classes["status-status"]}>
          {props.status === "in_progress" && "In Progress..."}
          {props.status === "waiting" && "Waiting"}
          {props.status === "completed" && "Completed"}
          {props.status === "cancelled" && "Cancelled"}
          {props.status === "errored" && !props.body && "Error"}
        </p>
        {props.body && <p className={classes["status-body"]}>{props.body}</p>}
      </div>
    </div>
  );
};

type InputProps = {
  loading?: boolean;
  label: string;
  value: string;
};

const Input: React.FC<InputProps> = ({ loading, label, value }) => {
  return (
    <div className="flex gap-2 bg-[rgba(255,255,255,0.15)] rounded-md h-12 px-2 pt-1 pb-[0.125rem]">
      <div className="flex flex-col flex-1">
        <p className="text-xs text-[var(--text-secondary)] leading-[1]">
          {label}
        </p>
        {loading ? (
          <p className="flex gap-2 items-center">
            <ValueLoader loading />
          </p>
        ) : (
          <input
            size={1}
            className="flex-1 outline-none bg-transparent"
            value={value}
            readOnly
          />
        )}
      </div>
      <button
        className={
          "bg-[#1E293B] text-[#fff] text-xs px-2 leading-[1] rounded-md hover:brightness-125 w-[3.75rem] h-8 text-center flex items-center justify-center self-center -mt-[0.125rem]"
        }
        onClick={() => copyText(value.toString())}
      >
        Copy
      </button>
    </div>
  );
};
