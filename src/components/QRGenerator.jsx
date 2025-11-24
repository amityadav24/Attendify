import React from 'react';
import { QRCodeCanvas } from 'qrcode.react';
import { Download, X } from 'lucide-react';

const QRGenerator = ({ student, onClose }) => {
    const downloadQR = () => {
        const canvas = document.getElementById('qr-code-canvas');
        const pngUrl = canvas
            .toDataURL("image/png")
            .replace("image/png", "image/octet-stream");
        let downloadLink = document.createElement("a");
        downloadLink.href = pngUrl;
        downloadLink.download = `${student.name}_${student.id}_QR.png`;
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="glass-card w-full max-w-md p-6 relative animate-in zoom-in-95 duration-200">
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
                >
                    <X className="w-5 h-5" />
                </button>

                <div className="text-center mb-8">
                    <h3 className="text-2xl font-bold text-white mb-2">Student QR Code</h3>
                    <p className="text-gray-400">Scan this code to mark attendance for</p>
                    <p className="text-primary-400 font-medium text-lg">{student.name}</p>
                </div>

                <div className="flex justify-center mb-8 p-4 bg-white rounded-2xl w-fit mx-auto">
                    <QRCodeCanvas
                        id="qr-code-canvas"
                        value={student.id}
                        size={200}
                        level={"H"}
                        includeMargin={true}
                    />
                </div>

                <div className="space-y-3">
                    <button
                        onClick={downloadQR}
                        className="w-full btn-primary flex items-center justify-center gap-2"
                    >
                        <Download className="w-5 h-5" />
                        Download QR Code
                    </button>
                    <p className="text-center text-xs text-gray-500">
                        ID: {student.id}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default QRGenerator;
