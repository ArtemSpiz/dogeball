import React, { useState } from "react";
import Modal, { ModalProps } from "./Modal";
import clsx from "clsx";
import Input from "./Input";
import { Button } from "../../../ui/button";
import Spinner from "./Spinner";
import { toast } from "sonner";
import { api } from "../../../presale-gg/api";
import { useAccount } from "wagmi";

const ContactModal: React.FC<Omit<ModalProps, "title">> = (others) => {
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const accountData = useAccount();

  const submit = async () => {
    setLoading(true);
    try {
      await api.postLeads({
        email,
        name,
        mobile,
        wallet_address: accountData.address,
      });
      toast.success("Successfully submitted details");
      others.onClose();
    } catch (err) {
      const msg = api.getApiErrorMessage(err, "Error submitting details");
      if (msg.toLowerCase() === "user details already exist") {
        toast(msg);
        others.onClose?.();
        return setLoading(false);
      }
      toast.error(msg);
    }
    setLoading(false);
  };

  return (
    <Modal {...others} className={clsx(others.className)} title="Stay in Touch">
      <p>
        Submit your contact details to keep up to date with the latest DOGEBALL
        news
      </p>
      <Input
        label="Name"
        value={name}
        onInput={(e) => setName(e.currentTarget.value)}
        placeholder="John Smith"
      />
      <Input
        label="Email"
        value={email}
        onInput={(e) => setEmail(e.currentTarget.value)}
        placeholder="john.smith@email.com"
      />
      <Input
        label="Phone Number (optional)"
        value={mobile}
        onInput={(e) => setMobile(e.currentTarget.value)}
        placeholder="(555) 555-1234"
      />
      <Button onClick={submit}>
        {loading ? <Spinner size={5} /> : "Submit"}
      </Button>
    </Modal>
  );
};

export default ContactModal;
