"use client";
import React, { useRef, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button, Input, Popover, PopoverTrigger, PopoverContent } from '@nextui-org/react';
import { createVerslag } from '@/serverActions/verslagactions'; // Importeer de createVerslag actie

const CreateVerslagPage: React.FC = () => {
    const dateRef = useRef<HTMLInputElement>(null);
    const healthComplaintsRef = useRef<HTMLInputElement>(null);
    const medicalHistoryRef = useRef<HTMLInputElement>(null);
    const diagnoseRef = useRef<HTMLInputElement>(null);
    const [popoverVisible, setPopoverVisible] = useState(false);
    const router = useRouter();

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const dateValue = dateRef.current!.value;
        const healthComplaintsValue = healthComplaintsRef.current!.value;
        const medicalHistoryValue = medicalHistoryRef.current!.value;
        const diagnoseValue = diagnoseRef.current!.value;

        try {
            await createVerslag({
                date: dateValue,
                healthcomplaints: healthComplaintsValue,
                medicalhistory: medicalHistoryValue,
                diagnose: diagnoseValue,
                zorgverlener_id: null,
                patient_id: null,
            });

            setPopoverVisible(true);
            setTimeout(() => {
                setPopoverVisible(false);
                router.push('/verslagen'); // Navigate back to the verslagen page
            }, 2000); // Delay for 2 seconds before navigating back
        } catch (error) {
            console.error('Error creating verslag:', error);
        }
    };

    const popoverContent = (
        <PopoverContent style={{ backgroundColor: 'red' }}>
            <div className="px-1 py-2">
                <div className="text-small font-bold">Succesvol aangemaakt</div>
                <div className="text-tiny">Het nieuwe verslag is succesvol aangemaakt.</div>
            </div>
        </PopoverContent>
    );

    return (
        <div style={{ padding: '50px', backgroundColor: 'rgb(216, 234, 255)', minHeight: '100vh' }}>
            <div>
                <h1 style={{ fontSize: 'xxx-large', fontWeight: 'bold', borderBottom: '2px solid black', display: 'inline-block', marginBottom: '50px' }}>Nieuw Verslag</h1>
            </div>

            <form onSubmit={handleSubmit}>
                <div>
                    <label style={{ display: 'block', marginBottom: '5px' }}>
                        Datum:
                    </label>
                    <input
                        type="date"
                        ref={dateRef}
                        required
                        style={{
                            display: 'block',
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
                    <label style={{ display: 'block', marginBottom: '5px' }}>
                        Gezondheidsklachten:
                    </label>
                    <Input
                        type="text"
                        placeholder="Voer de gezondheidsklachten in"
                        ref={healthComplaintsRef}
                        required
                        classNames={{
                            base: 'max-w-xs',
                            input: 'border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500'
                        }}
                    />
                </div>

                <div>
                    <label style={{ display: 'block', marginBottom: '5px' }}>
                        Medische geschiedenis:
                    </label>
                    <Input
                        type="text"
                        placeholder="Voer de medische geschiedenis in"
                        ref={medicalHistoryRef}
                        required
                        classNames={{
                            base: 'max-w-xs',
                            input: 'border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500'
                        }}
                    />
                </div>

                <div>
                    <label style={{ display: 'block', marginBottom: '5px' }}>
                        Diagnose:
                    </label>
                    <Input
                        type="text"
                        placeholder="Voer de diagnose in"
                        ref={diagnoseRef}
                        required
                        classNames={{
                            base: 'max-w-xs',
                            input: 'border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500'
                        }}
                    />
                </div>

                {/* Popover boven de Verslag aanmaken knop */}
                <div style={{ marginTop: '20px' }}>
                    <Popover placement="top" offset={20} showArrow color='success'>
                        <PopoverTrigger>
                            <Button
                                type="submit"
                                style={{
                                    backgroundColor: '#000369',
                                    color: 'white',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '10px', // Ruimte tussen tekst en icoon
                                    paddingLeft: '20px',
                                    paddingRight: '20px',
                                    border: 'none',
                                    borderRadius: '10px',
                                    padding: '10px',
                                    fontSize: '16px',
                                    cursor: 'pointer'
                                }}
                            >
                                Verslag aanmaken
                                <img
                                    src="/addiconVerslagen.png"
                                    alt="Add"
                                    style={{ width: '25px', height: '25px' }}
                                />
                            </Button>
                        </PopoverTrigger>
                        {popoverContent}
                    </Popover>
                </div>
            </form>

          
            <div style={{ marginTop: '20px' }}>
                <Link href="../verslagen">
                    <Button style={{ backgroundColor: '#000369' }}>
                        <img
                            src="/backiconVerslagen.png"
                            alt="Add"
                            style={{ width: '25px', height: '25px' }}
                        />
                    </Button>
                </Link>
            </div>
        </div>
    );
};

export default CreateVerslagPage;
