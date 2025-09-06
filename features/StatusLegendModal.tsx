import React from "react";
import { View, Text } from "react-native";
import {
  Modal,
  ModalBackdrop,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
} from "@/components/ui/modal";
import { Button, ButtonText } from "@/components/ui/button";
import StatusLegend from "@/features/StatusLegend";

type Props = {
  open: boolean;
  onClose: () => void;
  title?: string;
};

export default function StatusLegendModal({
  open,
  onClose,
  title = "Статусы игроков",
}: Props) {
  return (
    <Modal isOpen={open} onClose={onClose} size="md">
      <ModalBackdrop />
      <ModalContent>
        <ModalHeader>
          <Text>{title}</Text>
          <ModalCloseButton>Х</ModalCloseButton>
        </ModalHeader>

        <ModalBody>
          <View style={{ paddingVertical: 8 }}>
            <StatusLegend />
          </View>
        </ModalBody>

        <ModalFooter>
          <Button action="primary" onPress={onClose}>
            <ButtonText>Ок</ButtonText>
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
