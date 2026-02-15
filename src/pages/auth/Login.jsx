import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { AlertCircle, ArrowLeft, Loader2 } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

import { useLogin } from '../../hooks/auth/useLogin';

export default function Login() {
    const {email, setEmail, password, setPassword, error, isLoading, handleLogin} = useLogin()

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
            {/* Return to Home Link */}
            <Link to="/"
                className="absolute top-8 left-8 flex items-center gap-2 text-gray-600 hover:text-(--blueDark) transition-colors font-medium">
                <ArrowLeft size={20} />
                Return to Home
            </Link>

            <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 space-y-8">
                <div className="text-center space-y-2">
                    <h1 className="text-3xl font-serif font-bold text-gray-900">Admin Login</h1>
                    <p className="text-gray-500">Access the Shikshadeep Academy management portal</p>
                </div>

                {error && (
                    <Alert variant="destructive">
                        <AlertCircle className="h-4 w-4" />
                        <AlertTitle>Error</AlertTitle>
                        <AlertDescription>{error}</AlertDescription>
                    </Alert>
                )}

                <form onSubmit={handleLogin} className="space-y-6 text-left">
                    <div className="space-y-2">
                        <Label htmlFor="email">Email Address</Label>
                        <Input id="email" type="email" placeholder="admin@shikshadeep.edu.np" value={email} onChange={(e) =>
                            setEmail(e.target.value)}
                            required
                            className="rounded-lg"
                        />
                    </div>

                    <div className="space-y-2">
                        <div className="flex items-center justify-between">
                            <Label htmlFor="password">Password</Label>
                        </div>
                        <Input id="password" type="password" placeholder="••••••••" value={password} onChange={(e) =>
                            setPassword(e.target.value)}
                            required
                            className="rounded-lg" />
                    </div>

                    <Button type="submit" disabled={isLoading}
                        className="w-full bg-(--blueDark) hover:bg-(--blueDark)/90 text-white py-6 rounded-lg text-lg font-bold transition-all">
                        {isLoading ? (
                            <>
                                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                                Signing in...
                            </>
                        ) : (
                            'Sign In'
                        )}
                    </Button>
                </form>

                <div className="pt-4 text-center">
                    <p className="text-sm text-gray-400">
                        &copy; {new Date().getFullYear()} Shikshadeep Academy. All rights reserved.
                    </p>
                </div>
            </div>
        </div>
    );
}