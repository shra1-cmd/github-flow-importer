export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instanciate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "12.2.3 (519615d)"
  }
  public: {
    Tables: {
      activities: {
        Row: {
          activity_name: string
          activity_type: string | null
          calories_burned: number | null
          created_at: string | null
          duration_minutes: number | null
          heart_rate_avg: number | null
          heart_rate_max: number | null
          id: string
          notes: string | null
          performed_at: string | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          activity_name: string
          activity_type?: string | null
          calories_burned?: number | null
          created_at?: string | null
          duration_minutes?: number | null
          heart_rate_avg?: number | null
          heart_rate_max?: number | null
          id?: string
          notes?: string | null
          performed_at?: string | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          activity_name?: string
          activity_type?: string | null
          calories_burned?: number | null
          created_at?: string | null
          duration_minutes?: number | null
          heart_rate_avg?: number | null
          heart_rate_max?: number | null
          id?: string
          notes?: string | null
          performed_at?: string | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "activities_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      daily_summaries: {
        Row: {
          activities_logged: number | null
          created_at: string | null
          date: string
          id: string
          meals_logged: number | null
          total_calories_burned: number | null
          total_calories_consumed: number | null
          total_carbs: number | null
          total_exercise_minutes: number | null
          total_fats: number | null
          total_protein: number | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          activities_logged?: number | null
          created_at?: string | null
          date: string
          id?: string
          meals_logged?: number | null
          total_calories_burned?: number | null
          total_calories_consumed?: number | null
          total_carbs?: number | null
          total_exercise_minutes?: number | null
          total_fats?: number | null
          total_protein?: number | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          activities_logged?: number | null
          created_at?: string | null
          date?: string
          id?: string
          meals_logged?: number | null
          total_calories_burned?: number | null
          total_calories_consumed?: number | null
          total_carbs?: number | null
          total_exercise_minutes?: number | null
          total_fats?: number | null
          total_protein?: number | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "daily_summaries_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      food_analysis_results: {
        Row: {
          ai_suggestions: string | null
          bounding_boxes: Json | null
          confidence_score: number | null
          created_at: string | null
          detected_items: Json | null
          id: string
          total_calories: number | null
          total_carbs: number | null
          total_fats: number | null
          total_protein: number | null
          upload_id: string
        }
        Insert: {
          ai_suggestions?: string | null
          bounding_boxes?: Json | null
          confidence_score?: number | null
          created_at?: string | null
          detected_items?: Json | null
          id?: string
          total_calories?: number | null
          total_carbs?: number | null
          total_fats?: number | null
          total_protein?: number | null
          upload_id: string
        }
        Update: {
          ai_suggestions?: string | null
          bounding_boxes?: Json | null
          confidence_score?: number | null
          created_at?: string | null
          detected_items?: Json | null
          id?: string
          total_calories?: number | null
          total_carbs?: number | null
          total_fats?: number | null
          total_protein?: number | null
          upload_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "food_analysis_results_upload_id_fkey"
            columns: ["upload_id"]
            isOneToOne: true
            referencedRelation: "food_uploads"
            referencedColumns: ["id"]
          },
        ]
      }
      food_uploads: {
        Row: {
          analysis_status: string | null
          created_at: string | null
          file_size: number | null
          id: string
          image_url: string
          original_filename: string | null
          updated_at: string | null
          upload_status: string | null
          user_id: string
        }
        Insert: {
          analysis_status?: string | null
          created_at?: string | null
          file_size?: number | null
          id?: string
          image_url: string
          original_filename?: string | null
          updated_at?: string | null
          upload_status?: string | null
          user_id: string
        }
        Update: {
          analysis_status?: string | null
          created_at?: string | null
          file_size?: number | null
          id?: string
          image_url?: string
          original_filename?: string | null
          updated_at?: string | null
          upload_status?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "food_uploads_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      meal_items: {
        Row: {
          calories: number | null
          carbs: number | null
          created_at: string | null
          fats: number | null
          fiber: number | null
          food_name: string
          id: string
          meal_id: string
          protein: number | null
          quantity: string | null
          sodium: number | null
        }
        Insert: {
          calories?: number | null
          carbs?: number | null
          created_at?: string | null
          fats?: number | null
          fiber?: number | null
          food_name: string
          id?: string
          meal_id: string
          protein?: number | null
          quantity?: string | null
          sodium?: number | null
        }
        Update: {
          calories?: number | null
          carbs?: number | null
          created_at?: string | null
          fats?: number | null
          fiber?: number | null
          food_name?: string
          id?: string
          meal_id?: string
          protein?: number | null
          quantity?: string | null
          sodium?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "meal_items_meal_id_fkey"
            columns: ["meal_id"]
            isOneToOne: false
            referencedRelation: "meals"
            referencedColumns: ["id"]
          },
        ]
      }
      meals: {
        Row: {
          consumed_at: string | null
          created_at: string | null
          id: string
          meal_name: string | null
          meal_type: string | null
          notes: string | null
          tags: string[] | null
          total_calories: number | null
          total_carbs: number | null
          total_fats: number | null
          total_protein: number | null
          updated_at: string | null
          upload_id: string | null
          user_id: string
        }
        Insert: {
          consumed_at?: string | null
          created_at?: string | null
          id?: string
          meal_name?: string | null
          meal_type?: string | null
          notes?: string | null
          tags?: string[] | null
          total_calories?: number | null
          total_carbs?: number | null
          total_fats?: number | null
          total_protein?: number | null
          updated_at?: string | null
          upload_id?: string | null
          user_id: string
        }
        Update: {
          consumed_at?: string | null
          created_at?: string | null
          id?: string
          meal_name?: string | null
          meal_type?: string | null
          notes?: string | null
          tags?: string[] | null
          total_calories?: number | null
          total_carbs?: number | null
          total_fats?: number | null
          total_protein?: number | null
          updated_at?: string | null
          upload_id?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "meals_upload_id_fkey"
            columns: ["upload_id"]
            isOneToOne: false
            referencedRelation: "food_uploads"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "meals_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string | null
          email: string
          full_name: string | null
          id: string
          updated_at: string | null
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string | null
          email: string
          full_name?: string | null
          id: string
          updated_at?: string | null
        }
        Update: {
          avatar_url?: string | null
          created_at?: string | null
          email?: string
          full_name?: string | null
          id?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      user_goals: {
        Row: {
          allergies: string[] | null
          created_at: string | null
          daily_calorie_target: number | null
          dietary_preference: string | null
          id: string
          monthly_weight_goal: number | null
          updated_at: string | null
          user_id: string
          weekly_step_goal: number | null
        }
        Insert: {
          allergies?: string[] | null
          created_at?: string | null
          daily_calorie_target?: number | null
          dietary_preference?: string | null
          id?: string
          monthly_weight_goal?: number | null
          updated_at?: string | null
          user_id: string
          weekly_step_goal?: number | null
        }
        Update: {
          allergies?: string[] | null
          created_at?: string | null
          daily_calorie_target?: number | null
          dietary_preference?: string | null
          id?: string
          monthly_weight_goal?: number | null
          updated_at?: string | null
          user_id?: string
          weekly_step_goal?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "user_goals_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: true
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      user_settings: {
        Row: {
          ai_suggestions: boolean | null
          created_at: string | null
          health_access: boolean | null
          id: string
          language: string | null
          meal_reminders: boolean | null
          notifications_enabled: boolean | null
          theme: string | null
          units: string | null
          updated_at: string | null
          user_id: string
          workout_reminders: boolean | null
        }
        Insert: {
          ai_suggestions?: boolean | null
          created_at?: string | null
          health_access?: boolean | null
          id?: string
          language?: string | null
          meal_reminders?: boolean | null
          notifications_enabled?: boolean | null
          theme?: string | null
          units?: string | null
          updated_at?: string | null
          user_id: string
          workout_reminders?: boolean | null
        }
        Update: {
          ai_suggestions?: boolean | null
          created_at?: string | null
          health_access?: boolean | null
          id?: string
          language?: string | null
          meal_reminders?: boolean | null
          notifications_enabled?: boolean | null
          theme?: string | null
          units?: string | null
          updated_at?: string | null
          user_id?: string
          workout_reminders?: boolean | null
        }
        Relationships: [
          {
            foreignKeyName: "user_settings_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: true
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
