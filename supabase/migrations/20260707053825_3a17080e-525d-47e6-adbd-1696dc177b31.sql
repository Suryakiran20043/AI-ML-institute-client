DROP POLICY IF EXISTS "Anyone can submit an enquiry" ON public.enquiries;

CREATE POLICY "Anyone can submit an enquiry"
ON public.enquiries
FOR INSERT
TO anon, authenticated
WITH CHECK (
  length(name) BETWEEN 1 AND 200
  AND length(email) BETWEEN 3 AND 320
  AND email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$'
  AND length(phone) BETWEEN 5 AND 40
  AND length(message) BETWEEN 1 AND 5000
  AND (course_interest IS NULL OR length(course_interest) <= 200)
  AND (source_page IS NULL OR length(source_page) <= 500)
);