import Modal from '../ui/Modal';

const TermsModal = ({ isOpen, onClose }) => {
    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title="Terms and Conditions"
        // Ensure this modal sits on top of AuthModal (which has z-index 9999)
        // We can add a custom class or inline style if needed, but Modal.module.css has z-index 9999.
        // If both have 9999, the one rendered later (in DOM order) will be on top.
        // Since TermsModal will be rendered inside AuthModal (or alongside it), we need to ensure it's visible.
        // Ideally, we should increase z-index slightly for this one.
        >
            <div style={{ maxHeight: '60vh', overflowY: 'auto', paddingRight: '10px' }}>
                <p style={{ marginBottom: '15px', lineHeight: '1.6', color: '#374151' }}>
                    <strong>1. Introduction</strong><br />
                    Welcome to GuideX. By accessing our website, you agree to be bound by these Terms and Conditions, all applicable laws and regulations, and agree that you are responsible for compliance with any applicable local laws.
                </p>
                <p style={{ marginBottom: '15px', lineHeight: '1.6', color: '#374151' }}>
                    <strong>2. Use License</strong><br />
                    Permission is granted to temporarily download one copy of the materials (information or software) on GuideX's website for personal, non-commercial transitory viewing only.
                </p>
                <p style={{ marginBottom: '15px', lineHeight: '1.6', color: '#374151' }}>
                    <strong>3. Disclaimer</strong><br />
                    The materials on GuideX's website are provided on an 'as is' basis. GuideX makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
                </p>
                <p style={{ marginBottom: '15px', lineHeight: '1.6', color: '#374151' }}>
                    <strong>4. Limitations</strong><br />
                    In no event shall GuideX or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on GuideX's website.
                </p>
                <p style={{ lineHeight: '1.6', color: '#374151' }}>
                    <strong>5. Governing Law</strong><br />
                    These terms and conditions are governed by and construed in accordance with the laws of the State and you irrevocably submit to the exclusive jurisdiction of the courts in that State or location.
                </p>
            </div>
            <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'flex-end' }}>
                <button
                    onClick={onClose}
                    style={{
                        padding: '8px 16px',
                        backgroundColor: '#000',
                        color: 'white',
                        border: 'none',
                        borderRadius: '6px',
                        cursor: 'pointer',
                        fontWeight: '500'
                    }}
                >
                    I Understand
                </button>
            </div>
        </Modal>
    );
};

export default TermsModal;
