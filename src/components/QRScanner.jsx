import React, { useEffect, useState } from 'react';
import { Html5QrcodeScanner } from 'html5-qrcode';
import { Scan, CheckCircle2, XCircle } from 'lucide-react';

const QRScanner = ({ onScan }) => {
    const [scanResult, setScanResult] = useState(null);
    const [manualId, setManualId] = useState('');

    useEffect(() => {
        const scanner = new Html5QrcodeScanner(
            "reader",
            {
                fps: 10,
                qrbox: { width: 250, height: 250 },
                aspectRatio: 1.0
            },
      /* verbose= */ false
        );

        scanner.render(onScanSuccess, onScanFailure);

        function onScanSuccess(decodedText, decodedResult) {
            handleScan(decodedText);
        }

        function onScanFailure(error) {
            // handle scan failure
        }

        return () => {
            scanner.clear().catch(error => {
                console.error("Failed to clear html5-qrcode scanner. ", error);
            });
        };
    }, []);

    const handleScan = (id) => {
        setScanResult({ id, status: 'success', message: `Marked present: ${id}` });
        onScan(id);

        // Reset result after 3 seconds
        setTimeout(() => setScanResult(null), 3000);
    };

    const handleManualSubmit = (e) => {
        e.preventDefault();
        if (manualId.trim()) {
            handleScan(manualId);
            setManualId('');
        }
    };

    return (
        <div className="max-w-2xl mx-auto space-y-8">
            <div className="text-center space-y-2">
                <h2 className="text-3xl font-bold text-slate-900">Scan QR Code</h2>
                <p className="text-slate-500">Place the student's QR code within the frame to mark attendance.</p>
            </div>

            <div className="glass-card p-8">
                <div id="reader" className="overflow-hidden rounded-xl border-2 border-slate-200 bg-slate-50"></div>

                {/* Custom styling override for html5-qrcode */}
                <style>{`
          #reader__scan_region {
            background: rgba(255,255,255,0.5);
          }
          #reader__dashboard_section_csr span, 
          #reader__dashboard_section_swaplink {
            display: none !important;
          }
        `}</style>
            </div>

            <div className="flex items-center gap-4">
                <div className="h-px flex-1 bg-slate-200"></div>
                <span className="text-slate-400 text-sm font-medium">OR ENTER ID MANUALLY</span>
                <div className="h-px flex-1 bg-slate-200"></div>
            </div>

            <form onSubmit={handleManualSubmit} className="glass-card p-6 flex gap-4">
                <input
                    type="text"
                    value={manualId}
                    onChange={(e) => setManualId(e.target.value)}
                    placeholder="Enter Student ID"
                    className="input-field"
                />
                <button type="submit" className="btn-primary flex items-center gap-2">
                    <Scan className="w-4 h-4" />
                    Mark Present
                </button>
            </form>

            {scanResult && (
                <div className={`fixed bottom-8 right-8 p-4 rounded-xl shadow-2xl flex items-center gap-3 animate-in slide-in-from-bottom-5 fade-in duration-300 ${scanResult.status === 'success' ? 'bg-emerald-500 text-white' : 'bg-rose-500 text-white'
                    }`}>
                    {scanResult.status === 'success' ? <CheckCircle2 className="w-6 h-6" /> : <XCircle className="w-6 h-6" />}
                    <div>
                        <h4 className="font-bold">{scanResult.status === 'success' ? 'Success' : 'Error'}</h4>
                        <p className="text-sm opacity-90">{scanResult.message}</p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default QRScanner;
