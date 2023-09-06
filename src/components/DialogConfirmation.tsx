import { ErrorIc } from '@/assets'
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader
} from '@nextui-org/react'

interface Props {
  isOpen: boolean
  onOpenChange: () => void
  onClick: () => void
}

const DialogConfirmation = ({ isOpen, onOpenChange, onClick }: Props) => {
  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalContent>
        {(onClose) => (
          <div className="flex flex-col gap-1 justify-center items-center">
            <ModalHeader className="">
              ¿Estás seguro de que deseas eliminar este elemento?
            </ModalHeader>
            <ModalBody className="flex flex-col gap-2">
              <ErrorIc className="text-red-500 bg-red-100 w-16 h-16 rounded-full p-2" />
              <p className="text-center">
                Esta acción no se puede deshacer y eliminará permanentemente el
                elemento seleccionado.
              </p>
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="light" onPress={onClose}>
                Cerrar
              </Button>
              <Button color="primary" onPress={onClick}>
                Eliminar
              </Button>
            </ModalFooter>
          </div>
        )}
      </ModalContent>
    </Modal>
  )
}

export default DialogConfirmation
