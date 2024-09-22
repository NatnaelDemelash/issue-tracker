'use client';

import { Button, TextArea, TextField } from '@radix-ui/themes';
import React from 'react';

const NewIssuePage = () => {
  return (
    <div className="max-w-xl p-5 space-y-3">
      <TextField.Root placeholder="Title..."></TextField.Root>
      <TextArea placeholder="Enter description..." />
      <Button>Submit New Issue</Button>
    </div>
  );
};

export default NewIssuePage;
