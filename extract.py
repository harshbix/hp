import PyPDF2

def extract_text(pdf_path):
    text = ""
    try:
        reader = PyPDF2.PdfReader(pdf_path)
        for i, page in enumerate(reader.pages):
            text += f"--- Page {i+1} ---\n"
            text += page.extract_text() + "\n"
        
        with open("pdf_text.txt", "w", encoding="utf-8") as f:
            f.write(text)
        print("Extraction complete.")
    except Exception as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    extract_text("HP GRAPHICS portfolio.pdf")
