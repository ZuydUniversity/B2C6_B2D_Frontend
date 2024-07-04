"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { Button, Input, Popover, PopoverTrigger, PopoverContent } from '@nextui-org/react';
import { Verslag } from '../../Models/Verslag';
import { getVerslag, deleteVerslag } from '@/serverActions/verslagactions';

const DeleteVerslagPage = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const id = searchParams.get('id');
    const [verslag, setVerslag] = useState<Verslag | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [popoverVisible, setPopoverVisible] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            if (id) {
                try {
                    const data = await getVerslag(id);
                    setVerslag(data);
                } catch (error) {
                    setError((error as Error).message);
                } finally {
                    setLoading(false);
                }
            }
        };

        fetchData();
    }, [id]);

    const handleDelete = async () => {
        if (id) {
            try {
                await deleteVerslag(id);
                setPopoverVisible(true);
                setTimeout(() => {
                    setPopoverVisible(false);
                    router.push('/verslagen'); // Navigate back to the verslagen page
                }, 2000); // Delay for 2 seconds before navigating back
            } catch (error) {
                console.error('Error creating verslag:', error);
            }
        };
    }
    const popoverContent = (
        <PopoverContent style={{ backgroundColor: 'red' }}>
            <div className="px-1 py-2">
                <div className="text-small font-bold">Succesvol Verwijderd</div>
                <div className="text-tiny">Het verslag is succesvol erwijderd.</div>
            </div>
        </PopoverContent>
    );


    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div style={{ padding: '50px', backgroundColor: 'rgb(216, 234, 255)', minHeight: '100vh' }}>
            <div>
                <h1 style={{ fontSize: 'xxx-large', fontWeight: 'bold', borderBottom: '2px solid black', display: 'inline-block', marginBottom: '50px' }}>Verwijder Verslag</h1>
            </div>

            {verslag && (
                <form>
                    <div>
                        <label style={{ display: 'block', marginBottom: '5px'}}>
                            Datum
                        </label>
                        <input
                            type="date"
                            value={verslag.date}
                            disabled
                            style={{
                                display: 'block',
                                background:"white",
                                border: '1px solid #ccc',
                                borderRadius: '4px',
                                padding: '8px',
                                maxWidth: '100%',
                                boxSizing: 'border-box',
                                fontSize: '16px',
                                marginBottom: '10px'
                            }}
                        />
                    </div>

                    <div>
                        <label style={{ display: 'block', marginBottom: '5px'}}>
                            Gezondheidsklachten
                        </label>
                        <Input
                            type="text"
                            placeholder="Gezondheidsklachten"
                            value={verslag.healthcomplaints}
                            disabled
                            classNames={{
                                base: 'max-w-xs',
                                input: 'border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500'
                            }}
                        />
                    </div>

                    <div>
                        <label style={{ display: 'block', marginBottom: '5px'}}>
                            Medische geschiedenis
                        </label>
                        <Input
                            type="text"
                            placeholder="Medische geschiedenis"
                            value={verslag.medicalhistory}
                            disabled
                            classNames={{
                                base: 'max-w-xs',
                                input: 'border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500'
                            }}
                        />
                    </div>

                    <div>
                        <label style={{ display: 'block', marginBottom: '5px'}}>
                            Diagnose
                        </label>
                        <Input
                            type="text"
                            placeholder="Diagnose"
                            value={verslag.diagnose}
                            disabled
                            classNames={{
                                base: 'max-w-xs',
                                input: 'border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500'
                            }}
                        />
                    </div>

                    <div style={{ marginTop: '20px' }}>
                    <Popover placement="top" offset={20} showArrow color='success'>
                    <PopoverTrigger>
                        <Button
                            onClick={handleDelete}
                            style={{
                                backgroundColor: '#000369',
                                color: 'white',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '10px',
                                paddingLeft: '20px',
                                paddingRight: '20px',
                                border: 'none',
                                borderRadius: '10px',
                                padding: '10px',
                                fontSize: '16px',
                                cursor: 'pointer'
                            }}
                        >
                            Verwijder Verslag
                            <img
                                src="/deleteicon2Verslagen.png"
                                alt="Delete"
                                style={{ width: '25px', height: '25px', padding:'1px'}}
                            />
                        </Button>
                        </PopoverTrigger>
                        {popoverContent}
                    </Popover>
                    </div>
                </form>
            )}

            <div style={{ marginTop: '20px' }}>
                <Link href="/verslagen">
                    <Button style={{ backgroundColor: '#000369' }}>
                        <img
                            src="/backiconVerslagen.png"
                            alt="Back"
                            style={{ width: '25px', height: '25px' }}
                        />
                    </Button>
                </Link>
            </div>
        </div>
    );
};

export default DeleteVerslagPage;
