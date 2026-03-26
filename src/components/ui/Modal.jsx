import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
/* eslint-disable-next-line no-unused-vars */
import { motion, AnimatePresence } from 'framer-motion';

const backdropVariants = {
  hidden:  { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.2 } },
};

const panelVariants = {
  hidden:  { opacity: 0, scale: 0.96, y: 16 },
  visible: {
    opacity: 1, scale: 1, y: 0,
    transition: { type: 'spring', damping: 28, stiffness: 340, delay: 0.04 },
  },
  exit: {
    opacity: 0, scale: 0.96, y: 10,
    transition: { duration: 0.18, ease: [0.4, 0, 1, 1] },
  },
};

/**
 * Modal — centered dialog overlay
 * size: sm | md | lg | xl
 */
const Modal = ({ isOpen, onClose, children, title, size = 'md' }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="th-modal-root" role="dialog" aria-modal="true">
          {/* Backdrop */}
          <motion.div
            className="th-modal-backdrop"
            variants={backdropVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            onClick={onClose}
          />

          {/* Panel */}
          <div className="th-modal-positioner">
            <motion.div
              className={`th-modal th-modal--${size}`}
              variants={panelVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              {/* Header */}
              {title && (
                <div className="th-modal__header">
                  <h3 className="th-modal__title">{title}</h3>
                  <button
                    className="th-modal__close"
                    onClick={onClose}
                    aria-label="Close modal"
                  >
                    <FontAwesomeIcon icon={faTimes} />
                  </button>
                </div>
              )}

              {/* Body */}
              <motion.div
                className="th-modal__body"
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.12 }}
              >
                {children}
              </motion.div>
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default Modal;

