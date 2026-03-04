'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Camera, Upload, Zap, Target } from 'lucide-react';
import { SakuraDecoration } from '@/components/SakuraDecoration';

const hiraganaCharacters = [
  { character: 'あ', romaji: 'a', pronunciation: 'ah', example: 'あさ (asa) - morning', exampleMeaning: 'morning' },
  { character: 'い', romaji: 'i', pronunciation: 'ee', example: 'いぬ (inu) - dog', exampleMeaning: 'dog' },
  // Add more...
];

const katakanaCharacters = [
  { character: 'ア', romaji: 'a', pronunciation: 'ah', example: 'アメリカ (amerika) - America', exampleMeaning: 'America' },
  // Add more...
];

export default function Scanner() {
  const [scannedResult, setScannedResult] = useState<{
    character: string;
    romaji: string;
    pronunciation: string;
    example: string;
    exampleMeaning: string;
    type: string;
    confidence: number;
  } | null>(null);
  const [xpEarned, setXpEarned] = useState(0);
  const [isScanning, setIsScanning] = useState(false);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Show uploaded image preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setUploadedImage(reader.result as string);
        // Start scanning animation
        setIsScanning(true);

        // Simulate scanning delay
        setTimeout(() => {
          // Simulate scanning - pick a random character
          const allChars = [...hiraganaCharacters, ...katakanaCharacters];
          const randomChar = allChars[Math.floor(Math.random() * allChars.length)];
          const confidence = Math.floor(Math.random() * 15) + 85; // 85-100%
          setScannedResult({ ...randomChar, confidence, type: hiraganaCharacters.includes(randomChar) ? 'Hiragana' : 'Katakana' });
          setXpEarned(xpEarned + 10);
          setIsScanning(false);
        }, 2000); // 2 second scanning animation
      };
      reader.readAsDataURL(file);
    }
  };

  const handleScanAnother = () => {
    setScannedResult(null);
    setUploadedImage(null);
    setIsScanning(false);
  };

  return (
    <div className="p-4 md:p-8 relative">
      <SakuraDecoration />

      <div className="mb-6 md:mb-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-4xl mb-2">Character Scanner 📸</h1>
            <p className="text-sm md:text-base text-muted-foreground">AI-powered handwriting recognition</p>
          </div>
          <div className="flex items-center gap-2 bg-gradient-to-r from-accent to-yellow-300 px-4 md:px-6 py-3 rounded-2xl shadow-lg">
            <Zap className="w-5 h-5 text-navy" />
            <span className="text-xl md:text-2xl font-bold text-navy">+{xpEarned} XP</span>
          </div>
        </div>
      </div>

      <div className={`grid grid-cols-1 ${uploadedImage ? 'lg:grid-cols-2' : ''} gap-4 md:gap-6`}>
        {/* Upload Area */}
        <Card className={`shadow-2xl border-2 border-primary/20 ${!uploadedImage ? 'max-w-2xl mx-auto' : ''}`}>
          <CardHeader className="bg-gradient-to-r from-blue-50 to-cyan-50">
            <CardTitle className="text-lg md:text-xl">Upload Image</CardTitle>
            <CardDescription className="text-sm">Scan handwritten Hiragana or Katakana</CardDescription>
          </CardHeader>
          <CardContent className="p-4 md:p-6">
            <div className="space-y-4">
              {!uploadedImage ? (
                <div className="border-4 border-dashed border-secondary rounded-2xl p-8 md:p-16 text-center bg-gradient-to-br from-pink-50 to-purple-50 hover:border-primary transition-colors cursor-pointer">
                  <Camera className="w-16 h-16 md:w-20 md:h-20 mx-auto mb-4 text-primary" />
                  <div className="space-y-2">
                    <p className="text-lg font-medium">Drop your image here</p>
                    <p className="text-sm text-muted-foreground">or click to browse</p>
                  </div>
                  <input
                    id="file-upload"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleFileUpload}
                  />
                  <label htmlFor="file-upload">
                    <Button className="mt-4" variant="outline">
                      <Upload className="w-4 h-4 mr-2" />
                      Choose File
                    </Button>
                  </label>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="relative">
                    <img
                      src={uploadedImage}
                      alt="Uploaded"
                      className="w-full max-h-64 object-contain rounded-xl border-2 border-gray-200"
                    />
                    {isScanning && (
                      <div className="absolute inset-0 bg-black/50 rounded-xl flex items-center justify-center">
                        <div className="text-center text-white">
                          <div className="animate-spin w-8 h-8 border-4 border-white border-t-transparent rounded-full mx-auto mb-2"></div>
                          <p className="text-sm">Scanning...</p>
                        </div>
                      </div>
                    )}
                  </div>
                  <Button onClick={handleScanAnother} variant="outline" className="w-full">
                    Scan Another Image
                  </Button>
                </div>
              )}

              <div className="bg-gradient-to-r from-blue-100 to-cyan-100 border-2 border-blue-300 rounded-2xl p-4 md:p-5">
                <h4 className="font-medium mb-2 flex items-center gap-2">
                  <Target className="w-4 h-4" />
                  How it works
                </h4>
                <ul className="text-sm space-y-1 text-blue-800">
                  <li>• Upload a clear image of handwritten Japanese characters</li>
                  <li>• Our AI analyzes the strokes and identifies the character</li>
                  <li>• Get instant feedback with pronunciation and examples</li>
                  <li>• Earn XP for each successful scan!</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Scan Results */}
        {uploadedImage && (
          <Card className="shadow-2xl border-2 border-secondary/30">
            <CardHeader className="bg-gradient-to-r from-pink-50 to-purple-50">
              <CardTitle className="text-lg md:text-xl">Scan Result</CardTitle>
              <CardDescription className="text-sm">
                {scannedResult ? `Detected: ${scannedResult.type} character` : 'Processing your image...'}
              </CardDescription>
            </CardHeader>
            <CardContent className="p-4 md:p-6">
              {scannedResult ? (
                <div className="space-y-6">
                  {/* Character Display */}
                  <div className="text-center">
                    <div className="text-6xl md:text-7xl mb-4 text-primary">
                      {scannedResult.character}
                    </div>
                    <Badge className="mb-2">{scannedResult.type}</Badge>
                    <div className="text-sm text-muted-foreground">
                      Confidence: {scannedResult.confidence}%
                    </div>
                  </div>

                  {/* Details */}
                  <div className="space-y-4">
                    <div className="bg-gray-50 rounded-xl p-4">
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="font-medium text-muted-foreground">Romaji:</span>
                          <div className="font-bold text-primary">{scannedResult.romaji}</div>
                        </div>
                        <div>
                          <span className="font-medium text-muted-foreground">Pronunciation:</span>
                          <div className="font-bold text-primary">{scannedResult.pronunciation}</div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-blue-50 rounded-xl p-4">
                      <h4 className="font-medium mb-2 text-blue-900">Example Usage</h4>
                      <div className="text-sm">
                        <div className="font-medium text-blue-800">{scannedResult.example}</div>
                        <div className="text-blue-600">"{scannedResult.exampleMeaning}"</div>
                      </div>
                    </div>
                  </div>

                  {/* XP Earned */}
                  <div className="bg-gradient-to-r from-accent to-yellow-300 rounded-xl p-4 text-center">
                    <Zap className="w-6 h-6 mx-auto mb-2 text-navy" />
                    <div className="text-lg font-bold text-navy">+10 XP Earned!</div>
                    <div className="text-sm text-navy/80">Great job scanning this character</div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8">
                  <div className="animate-pulse">
                    <div className="w-16 h-16 bg-gray-200 rounded-full mx-auto mb-4"></div>
                    <div className="h-4 bg-gray-200 rounded w-3/4 mx-auto mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/2 mx-auto"></div>
                  </div>
                  <p className="text-muted-foreground mt-4">Analyzing your handwriting...</p>
                </div>
              )}
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}