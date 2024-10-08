'use client';

import { Button, Callout, Text, TextArea, TextField } from '@radix-ui/themes';

import SimpleMDE from 'react-simplemde-editor';
import 'easymde/dist/easymde.min.css';
import { Controller, useForm } from 'react-hook-form';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { MdError } from 'react-icons/md';
import { zodResolver } from '@hookform/resolvers/zod';
import { createIssueSchema } from '@/app/validateSchemas';

interface IssueForm {
  title: string;
  description: string;
}

const NewIssuePage = () => {
  const [error, setError] = useState('');
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IssueForm>({
    resolver: zodResolver(createIssueSchema),
  });
  const router = useRouter();
  return (
    <div className="max-w-xl">
      {error && (
        <Callout.Root color="red" className="mb-5">
          <Callout.Icon>
            <MdError />
          </Callout.Icon>
          <Callout.Text>{error}</Callout.Text>
        </Callout.Root>
      )}
      <form
        className="space-y-3"
        onSubmit={handleSubmit(async (data) => {
          try {
            await axios.post('/api/issues', data).then((response) => {
              router.push('/issues');
            });
          } catch (error) {
            setError('Failed to create issue. Please try again.');
          }
        })}
      >
        <TextField.Root placeholder="Title..." {...register('title')} />
        {errors.title && (
          <Text className="text-red-500" as="p">
            {errors.title.message}
          </Text>
        )}
        <Controller
          name="description"
          control={control}
          render={({ field }) => (
            <SimpleMDE placeholder="Enter description..." {...field} />
          )}
        />
        {errors.description && (
          <Text className="text-red-500" as="p">
            {errors.description.message}
          </Text>
        )}
        <Button>Submit New Issue</Button>
      </form>
    </div>
  );
};

export default NewIssuePage;
