// src/components/Admintool/ContactDelete.jsx
import React, { useRef, useState } from "react";
import PropTypes from "prop-types";
import {
  Button,
  IconButton,
  useToast,
  useDisclosure,
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
} from "@chakra-ui/react";
import { DeleteIcon } from "@chakra-ui/icons";

const API_BASE = (import.meta.env?.VITE_API_BASE_URL || "").replace(/\/+$/, "");

/**
 * Props:
 * - id (number)            : رقم السجل المطلوب حذفه
 * - onDeleteSuccess? ()    : كولباك بعد الحذف الناجح
 * - asIcon? (boolean)      : إظهار كزر أيقونة فقط
 * - label? (string)        : نص الزر (إذا لم يكن أيقونة) – افتراضي "حذف"
 * - variant? (string)      : مظهر الزر Chakra – افتراضي "outline"
 * - colorScheme? (string)  : مخطط اللون – افتراضي "red"
 * - size? (string)         : حجم الزر – افتراضي "sm"
 */
export default function ContactDelete({
  id,
  onDeleteSuccess,
  asIcon = false,
  label = "حذف",
  variant = "outline",
  colorScheme = "red",
  size = "sm",
  ...btnProps
}) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const toast = useToast();

  const handleDelete = async () => {
    try {
      setLoading(true);

      const token = localStorage.getItem("token") || "";
      const res = await fetch(`${API_BASE}/contact-us/${id}`, {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        let msg = "❌ حدث خطأ أثناء الحذف";
        try {
          const ct = res.headers.get("content-type") || "";
          const data = ct.includes("application/json") ? await res.json() : await res.text();
          msg = typeof data === "string" ? (data || msg) : (data?.message || msg);
        } catch (_) {}
        throw new Error(msg);
      }

      toast({ status: "success", title: "✅ تم حذف العنصر بنجاح" });
      onDeleteSuccess?.();
      onClose();
    } catch (err) {
      toast({
        status: "error",
        title: "لم يتم الحذف",
        description: err?.message || "حاول مرة أخرى",
      });
    } finally {
      setLoading(false);
    }
  };

  const Btn = asIcon ? IconButton : Button;

  return (
    <>
      <Btn
        size={size}
        variant={variant}
        colorScheme={colorScheme}
        leftIcon={!asIcon ? <DeleteIcon /> : undefined}
        aria-label="حذف"
        onClick={onOpen}
        isDisabled={loading}
        {...btnProps}
      >
        {asIcon ? <DeleteIcon /> : label}
      </Btn>

      <AlertDialog isOpen={isOpen} onClose={loading ? () => {} : onClose} leastDestructiveRef={cancelRef} isCentered>
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              تأكيد الحذف
            </AlertDialogHeader>
            <AlertDialogBody>
              هل أنت متأكد من حذف هذا الطلب؟ لا يمكن التراجع عن هذه العملية.
            </AlertDialogBody>
            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose} isDisabled={loading}>
                إلغاء
              </Button>
              <Button colorScheme="red" onClick={handleDelete} ml={3} isLoading={loading} loadingText="جارٍ الحذف...">
                حذف
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
}

ContactDelete.propTypes = {
  id: PropTypes.number.isRequired,
  onDeleteSuccess: PropTypes.func,
  asIcon: PropTypes.bool,
  label: PropTypes.string,
  variant: PropTypes.string,
  colorScheme: PropTypes.string,
  size: PropTypes.string,
};
