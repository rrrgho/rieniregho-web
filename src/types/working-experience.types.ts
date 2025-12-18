export type WorkingExperience = {
  id?: string;
  icon?: string | File;
  title?: string;
  subtitle?: string;
  description?: string;
  start_date?: string | Date;
  end_date?: string | Date;
  is_present?: boolean;
  location?: string;
  company_logo?: string | File;
  banner?: string | File;
  created_at?: string | Date;
};
