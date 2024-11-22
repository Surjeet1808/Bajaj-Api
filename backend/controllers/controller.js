
const response={
   "operation_code":1
}

const isPrime = (num) => {
  num = parseInt(num);
  if (num <= 1) return false;
  for (let i = 2; i <= Math.sqrt(num); i++) {
      if (num % i === 0) return false;
  }
  return true;
};

exports.handelGet = async (req, res) => {
  return res.status(200).json({response});
};

exports.handelPost = async (req, res) => {
    try {
        const { data, file_b64 } = req.body;
        
        if (!Array.isArray(data)) {
            return res.status(400).json({
                is_success: false,
                error: "Invalid input format"
            });
        }

        const numbers = data.filter(item => !isNaN(item));
        const alphabets = data.filter(item => isNaN(item) && item.length === 1);
        
        // Find highest lowercase alphabet
        const lowercaseAlphabets = alphabets.filter(char => char >= 'a' && char <= 'z');
        const highest_lowercase_alphabet = lowercaseAlphabets.length > 0 
            ? [lowercaseAlphabets.reduce((a, b) => a > b ? a : b)]
            : [];

        // Check for prime numbers
        const is_prime_found = numbers.some(num => isPrime(num));

        // Process file if present
        let fileInfo = {
            file_valid: false
        };

        if (file_b64) {
            try {
                const buffer = Buffer.from(file_b64, 'base64');
                const fileSize = Math.ceil(buffer.length / 1024);

                const mimeType = file_b64.startsWith('/9j/') ? 'image/jpeg'
                    : file_b64.startsWith('iVBOR') ? 'image/png'
                    : file_b64.startsWith('JVBERi0') ? 'application/pdf'
                    : 'application/octet-stream';

                fileInfo = {
                    file_valid: true,
                    file_mime_type: mimeType,
                    file_size_kb: fileSize.toString()
                };
            } catch (error) {
                fileInfo.file_valid = false;
            }
        }

        const response = {
            is_success: true,
            user_id: "surjeet_dhakad_18082003",
            email: "surjeetdhakad8@gmail.com",
            roll_number: "0101CS211122",
            numbers,
            alphabets,
            highest_lowercase_alphabet,
            is_prime_found,
            ...fileInfo
        };

        return res.json(response);

    } catch (error) {
        return res.status(500).json({
            is_success: false,
            error: "Internal server error"
        });
    }
}
