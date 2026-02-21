import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

@Injectable()
export class GuestbookService {
    private supabase: SupabaseClient;

    constructor(private configService: ConfigService) {
        const supabaseUrl = this.configService.get<string>('SUPABASE_URL') ||
            this.configService.get<string>('VITE_SUPABASE_URL');
        const supabaseKey = this.configService.get<string>('SUPABASE_KEY') ||
            this.configService.get<string>('VITE_SUPABASE_ANON_KEY');

        console.log('=== GuestbookService Initializing ===');
        console.log('SUPABASE_URL:', supabaseUrl);
        console.log('SUPABASE_KEY:', supabaseKey ? '***found***' : 'NOT_FOUND');

        this.supabase = createClient(supabaseUrl || '', supabaseKey || '');
    }

    async findAll() {
        const { data, error } = await this.supabase
            .from('guestbook')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) throw new Error(error.message);
        return data;
    }

    async create(dto: any) {
        const { data, error } = await this.supabase
            .from('guestbook')
            .insert([dto])
            .select();

        if (error) throw new Error(error.message);
        return data;
    }

    async update(id: string, dto: any) {
        const { data, error } = await this.supabase
            .from('guestbook')
            .update(dto)
            .eq('id', id)
            .select();

        if (error) throw new Error(error.message);
        return data;
    }

    async delete(id: string) {
        const { data, error } = await this.supabase
            .from('guestbook')
            .delete()
            .eq('id', id)
            .select();

        if (error) throw new Error(error.message);
        return data;
    }
}
