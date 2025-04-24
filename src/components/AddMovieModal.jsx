import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button
} from '@chakra-ui/react'
import AddMovie from '../pages/AddMovie'

export default function AddMovieModal({ isOpen, onClose, onAddMovie }) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Добавить новый фильм</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <AddMovie onAddMovie={onAddMovie} onSuccess={onClose} />
        </ModalBody>
        <ModalFooter>
          <Button onClick={onClose} variant="ghost">
            Отмена
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}